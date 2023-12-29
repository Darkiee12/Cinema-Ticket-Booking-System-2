import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShowResponse } from "../models/Show";
import ShowService from "../services/ShowService";
import Loading from "../components/Loading";
import { Movie } from "../models/Movie";
import MovieService from "../services/MovieService";
import { Response } from "../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faClapperboard,
  faClock,
  faGlobe,
  faIdCard,
  faLanguage,
  faMagnifyingGlass,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";

export default function ShowPage() {
  const imdbId = useParams<{ imdbId: string }>().imdbId;
  const [show, setShow] = useState<ShowResponse[][]>([]);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [toggle, setToggle] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const fetchMovie = async () => {
    const res = await MovieService.getMovieByImdbId(imdbId!);
    if (res instanceof Response) {
    } else {
      setMovie(res);
    }
  }

  useEffect(() => {
    fetchMovie();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await ShowService.getShowFromMovieImdbIdAndDate(imdbId!, getFormattedDate(selectedDate));
        setLoading(false);
        setShow(response instanceof Array ? response : []);
        setError(response instanceof Array ? false : true);
      } catch (error) {
        setError(true);
      }
    };

    fetchData();
  }, [selectedDate]);

  return (
    <div className="w-full h-full">
      <p className="w-full text-center text-xs italic ">You are booking tickets for {movie?.title || ""}!
        <a className="text-blue-500 hover:underline" href="../movies"> Incorrect movie?</a>
      </p>
      {movie && (
        <div
          className="bg-center bg-cover bg-no-repeat relative w-100% h-[80vh]"
          style={{
            backgroundImage: `linear-gradient(rgba(30, 27, 38, 0.95), rgba(30, 27, 38, 0.95)), url("${movie.poster}")`,
          }}
        >
          <div className="relative flex flex-wrap w-full h-full shadow-[5px 5px 115px -14px black] rounded mb-0">
            <PosterComponent poster={movie.poster} />
            <div className="w-[68%] pt-10">
              <div className="w-full text-justify py-0 ml-[1%]">
                <div className="w-full after:clear-both before:content-[''] after:content-[''] before:table after:table zoom-100">
                  <div className="w-full block mt-[0%] mb-[0.5%] mx-[0.5%]">
                    <MovieTitle movie={movie} />
                    <MovieAttribute movie={movie} />
                  </div>
                </div>
                <MoviePlot movie={movie} />
                <MovieDetail movie={movie} />
              </div>
            </div>
          </div>
        </div>

      )}
      <div className="w-full min-h-screen">
        <div className="w-full h-auto mt-5 justify-center items-center p-1 border-b-2 border-b-blue-400">
          <DatesComponent toggle={toggle} setToggle={setToggle} onDateClick={setSelectedDate} />
        </div>
        <CinemaComponent shows={show} loading={loading} />
      </div>
    </div>

  );
}

const DatesComponent = ({ toggle, setToggle, onDateClick }: { toggle: number, setToggle: (toggle: number) => void, onDateClick: (date: Date) => void }) => {
  const today = new Date();

  return (
    <div className="w-full flex justify-center space-x-10 overflow-x-auto">
      {[...Array(7)].map((_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        return <DateComponent key={i} index={i} day={date} toggle={toggle} setToggle={setToggle} onDateClick={onDateClick} />;
      })}
    </div>
  );
};

const DateComponent = ({ index, day, toggle, setToggle, onDateClick }: { index: number, day: Date, toggle: number, setToggle: (toggle: number) => void, onDateClick: (date: Date) => void }) => {
  const today = new Date();
  const isToday = day.getDate() === today.getDate();

  const handleClick = () => {
    setToggle(index);
    onDateClick(day); // Pass the selected date to the parent component
  };

  return (
    <button
      className={`w-[10%] h-20 whitespace-nowrap font-light hover:bg-blue-400 hover:text-white hover:rounded-md 
        ${toggle === index ? 'bg-blue-600 text-white rounded-md' : ''}`}
      onClick={handleClick}
    >
      <p className="w-full">{isToday ? 'Today' : day.toLocaleDateString('en-US', { weekday: 'short' })}</p>
      <p className="w-full">{`${day.toLocaleDateString('en-US', { month: 'short' })} ${day.getDate()}`}</p>
    </button>
  );
};


const CinemaComponent: React.FC<{ shows: ShowResponse[][], loading: boolean }> = ({ shows, loading }) => {
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="w-full pt-5">
      {shows.map((cinema, i) => (
        <div key={i} className={`${(i ^ 1) === i + 1 ? "w-full h-full bg-[#FDFBFA] " : "w-full h-full bg-white"}`}>
          <ShowComponent key={i} shows={cinema} />;
        </div>
      ))}
    </div>
  );
};
const ShowComponent: React.FC<{ shows: ShowResponse[] }> = ({ shows }) => {
  return (
    <div className="w-full p-3">
      <p className="font-bold text-2xl">{shows[0].cinemaName}</p>
      <div className="flex flex-wrap">
        {shows
          .slice() // create a shallow copy to avoid mutating the original array
          .sort((a, b) => {
            const startTimeA = new Date(`1970-01-01T${a.startTime}`);
            const startTimeB = new Date(`1970-01-01T${b.startTime}`);
            return startTimeA.getTime() - startTimeB.getTime();
          })
          .map((show, i) => (
            <div key={i} className="w-1/5 p-2">
              <TimeComponent show={show} />
            </div>
          ))}
      </div>
    </div>
  );
};

const TimeComponent: React.FC<{ show: ShowResponse }> = ({ show }) => {
  return (
    <button 
    className="border-2 rounded w-50 h-20 mx-auto flex items-center justify-center hover:bg-blue-400 hover:text-white"
    onClick={() => window.location.href = `/booking/${show.showId}`}
    >
      <p className="text-base">{show.startTime.slice(0, 5)}</p>
    </button>
  );
};

const PosterComponent: React.FC<{ poster: string }> = ({ poster }) => {
  return (
    <div className="w-[30%] h-full relative bg-cover bg-gradient-to-b from-transparent via-opacity-6 to-opacity-100 filter gradient-bg">
      <img
        alt="poster"
        className="h-[90%] w-[90%] bg-center bg-no-repeat bg-cover rounded-tl-lg rounded-tr-lg ml-[5%] mt-[5%]"
        src={poster}
      />
    </div>
  );
};

const MovieTitle: React.FC<{ movie: Movie }> = ({ movie }) => {
  return (
    <div className="w-full">
      <h1 className="text-5xl bold text-[#e7e7e7] mx-[0.5%]-2 m-0 font-montserrat">
        {movie.title}
      </h1>
      <div className="w-full mb-2" />
      {movie.title !== movie.originalTitle && (
        <h3 className="text-[#e7e7e7] mx-[0.5%]-2 m-0 font-montserrat">
          {movie.originalTitle}
        </h3>
      )}
      <h4 className="italic bold text-[#e7e7e7]">{movie.tagline}</h4>
    </div>
  );
};

const MovieAttribute: React.FC<{ movie: Movie }> = ({ movie }) => {
  return (
    <div className="mt-2">
      {movie.imdbId != null && (
        <ul className="m-0 p-0 flex justify-between mx-5">
          {movie.rated && (
            <li className="text-xs text-[#8b8b8b] w-auto block float-left font-semibold mr-1.5 font-sans overflow-auto">
              <FontAwesomeIcon icon={faIdCard} className="fa-regular" />{" "}
              {movie.rated}
            </li>
          )}

          {movie.runtime && (
            <li className="text-xs text-[#8b8b8b] w-auto block float-left font-semibold mr-1.5 font-sans overflow-auto">
              <FontAwesomeIcon icon={faClock} className="fa-regular" />{" "}
              {movie.runtime} minutes
            </li>
          )}

          {movie.genre && movie.genre.length > 0 && (
            <li className="text-xs text-[#8b8b8b] w-auto block float-left font-semibold mr-1.5 font-sans overflow-auto">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="fa-regular"
              />{" "}
              {movie.genre.map((genre) => genre.name).join(", ")}
            </li>
          )}

          {movie.released && (
            <li className="text-xs text-[#8b8b8b] w-auto block float-left font-semibold mr-1.5 font-sans overflow-auto">
              <FontAwesomeIcon icon={faCalendar} className="fa-regular" />{" "}
              {movie.released}
            </li>
          )}

          {movie.language && movie.language.length > 0 && (
            <li className="text-xs text-[#8b8b8b] w-auto block float-left font-semibold mr-1.5 font-sans overflow-auto">
              <FontAwesomeIcon
                icon={faLanguage}
                className="fa-solid fa-language"
              />{" "}
              {movie.language
                .map((language) => language.englishName)
                .join(", ")}
            </li>
          )}

          {movie.countries &&
            movie.countries.length > 0 && (
              <li className="text-xs text-[#8b8b8b] w-auto block float-left font-semibold mr-1.5 font-sans overflow-auto">
                <FontAwesomeIcon
                  icon={faGlobe}
                  className="fa-solid fa-global"
                />{" "}
                {movie.countries
                  .map((country) => country.name)
                  .join(", ")}
              </li>
            )}
        </ul>
      )}
    </div>
  );
};

const MoviePlot: React.FC<{ movie: Movie }> = ({ movie }) => {
  return (
    <>
      <div className="w-full after:clear-both before:content-[''] after:content-[''] before:table after:table zoom-100 mt-3">
        <div className="w-[47%] float-left block mt-[0%] mb-[0.5%] mx-[0.5%]">
          <h5 className="text-xl text-[#e7e7e7] m-0 font-montserrat">
            SUMMARY
          </h5>
        </div>
        <div className="w-[47%] float-left block mt-[0%] mb-[0.5%] mx-[0.5%]"></div>
      </div>
      <div className="w-full after:clear-both before:content-[''] after:content-[''] before:table after:table zoom-100">
        <div className="min-h-[6rem] mx-[0.5%]">
          <p className="text-xl text-[#a2a2a2] text-justify leading-[1.3] font-sans">
            {movie.plot}
          </p>
        </div>
      </div>
    </>
  );
};

const MovieDetail: React.FC<{ movie: Movie }> = ({ movie }) => {
  return (
    movie && (
      <div className="space-y-1 mx-1 mt-5">
        <div className="h-5 mb-2">
          <p className="text-lg font-light text-[#e7e7e7] italic m-0 font-sans">
            <FontAwesomeIcon icon={faClapperboard} className="fa-regular" />{" "}
            {movie.cast
              .filter((cast) => cast.role === "director")
              .map((cast) => cast.name)
              .join(", ")}
          </p>
        </div>
        <div className="h-5 mb-2">
          <p className="text-lg font-light text-[#e7e7e7] italic m-0 font-sans">
            <FontAwesomeIcon icon={faPencil} className="fa-regular" />{" "}
            {movie.cast
              .filter((cast) => cast.role === "writer")
              .map((cast) => cast.name)
              .join(", ")}
          </p>
        </div>
      </div>
    )
  );
};


function getFormattedDate(date: Date): string {
  const year: number = date.getFullYear();
  const month: string = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 to the month because months are zero-based
  const day: string = String(date.getDate()).padStart(2, '0');
  const formattedDate: string = `${year}-${month}-${day}`;
  return formattedDate;
}