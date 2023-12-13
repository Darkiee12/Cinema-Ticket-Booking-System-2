import { useState, FormEvent, useEffect } from "react";
import MovieService, { fetchMovie } from "../services/MovieService";
import ActorService from "../services/ActorService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faCalendar,
  faCircleCheck,
  faCircleXmark,
  faClapperboard,
  faClock,
  faDatabase,
  faFloppyDisk,
  faGlobe,
  faIdCard,
  faLanguage,
  faMagnifyingGlass,
  faPencil,
  faPlay,
  faSearch,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import { RawMovie } from "../models/Movie";
import Actor from "../models/Actor";
import { convertMovie } from "../models/Movie";
import companyDefault from "../assets/movies/movie_default.jpg";
import defaultBackground from "../assets/movies/background.jpg";
import imdbLogo from "../assets/movies/imdb.png";
import rottenTomatoesLogo from "../assets/movies/Rotten_Tomatoes.png";
import metacriticLogo from "../assets/movies/Metacritic_M.png";
import notFoundPoster from "../assets/movies/not_found.jpg";
import oscarImg from "../assets/movies/oscar.png";
import actorDefaultPFP from "../assets/movies/actor_default.jpg";
import "../index.css";
import { dateConverter } from "../utils/date";

const defaultMovie: Partial<RawMovie> = {
  title: "Title goes here",
  overview:
    "Join our intrepid adventurers as they search for the perfect movie. Use the search bar to embark on your cinematic journey and uncover stories that speak to your soul.",
};

const notFoundMovie: Partial<RawMovie> = {
  ...defaultMovie,
  title: "Movie not found",
  overview: "Please try again",
  poster_path: notFoundPoster,
};

const poster: (movie: Partial<RawMovie>) => string = (movie) =>
  movie.id
    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
    : defaultBackground;

export default function AddMovie() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [movie, setMovie] = useState<Partial<RawMovie>>(defaultMovie);
  const [alert, setAlert] = useState<boolean | null>(null);

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();
    const data = await fetchMovie(searchTerm);
    if (!data || !data.id) {
      setMovie(notFoundMovie);
    } else {
      setMovie(data);
    }
  };

  const submitMovie = async () => {
    const success = await MovieService.addMovie(
      convertMovie(movie as RawMovie)
    );
    setAlert(success); // Set success to the result of addMovie
  };

  useEffect(() => {
    const bg = document.getElementById("bg");
    bg!.style.backgroundImage = `linear-gradient(rgba(30, 27, 38, 0.95), rgba(30, 27, 38, 0.95)), url("${poster(
      movie
    )}")`;
  }, [poster(movie)]);

  useEffect(() => {
    const message = document.getElementById("message");

    const fadeOut = () => {
      if (message) {
        message.classList.add("fade-out");
        setTimeout(() => {
          message.remove();
        }, 500); // This is the same duration as the CSS transition
      }
    };

    setTimeout(fadeOut, 5000); // 5 seconds (5000 milliseconds)
  }, []);
  return (
    <div>
      <div
        className="relative w-100% h-[80vh] bg-center bg-cover bg-no-repeat"
        id="bg"
      >
        <div></div>
        <div className="flex flex-wrap w-full h-full shadow-[5px 5px 115px -14px black] rounded mb-0">
          <PosterComponent poster={poster(movie)} />
          <div className="w-[68%]">
            <div className="w-full h-[5vh] flex mx-auto items-center justify-center">
              <form onSubmit={handleSearch} className="">
                <input
                  className="w-[85%] h-8 text-[#9DBFAF] rounded-l-[5px] border-3 border-solid border-[#00B4CC] focus:text-[#00B4CC] outline-none"
                  type="search"
                  placeholder="Search a movie by title or IMDb ID"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  type="submit"
                  className="w-[15%] h-8 border text-center text-white cursor-pointer text-lg rounded-r-[5px] border-[#00B4CC] bg-[#00B4CC]"
                  aria-label="Search"
                >
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="fa-solid fa-search"
                  />
                </button>
              </form>
              <button
                type="submit"
                className="w-[5%] h-8 border text-center text-white cursor-pointer text-lg rounded-r-[5px] border-[#00B4CC] bg-[#00B4CC]"
                aria-label="Submit to database"
                onClick={submitMovie}
              >
                <FontAwesomeIcon
                  icon={faDatabase}
                  className="fa-thin fa-database"
                />
              </button>
            </div>
            {alert === null ? null : <AlertForm success={alert} />}
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
      <div>
        <Actors queries={movie.Actors?.split(",")} />
        <MovieRating movie={movie} />
        <ProductionCompanies movie={movie} />
      </div>
    </div>
  );
}

const MovieTitle: React.FC<{ movie: Partial<RawMovie> }> = ({ movie }) => {
  return (
    <div className="w-full">
      <h1 className="text-5xl bold text-[#e7e7e7] mx-[0.5%]-2 m-0 font-montserrat">
        {movie.title}
      </h1>
      <div className="w-full mb-2" />
      {movie.title !== movie.original_title && (
        <h3 className="text-[#e7e7e7] mx-[0.5%]-2 m-0 font-montserrat">
          {movie.original_title}
        </h3>
      )}
      <h4 className="italic bold text-[#e7e7e7]">{movie.tagline}</h4>
    </div>
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

const MovieAttribute: React.FC<{ movie: Partial<RawMovie> }> = ({ movie }) => {
  return (
    <div className="mt-2">
      {movie.imdbID != null && (
        <ul className="m-0 p-0 flex justify-between mx-5">
          {movie.Rated && (
            <li className="text-xs text-[#8b8b8b] w-auto block float-left font-semibold mr-1.5 font-sans overflow-auto">
              <FontAwesomeIcon icon={faIdCard} className="fa-regular" />{" "}
              {movie.Rated}
            </li>
          )}

          {movie.runtime && (
            <li className="text-xs text-[#8b8b8b] w-auto block float-left font-semibold mr-1.5 font-sans overflow-auto">
              <FontAwesomeIcon icon={faClock} className="fa-regular" />{" "}
              {movie.runtime} minutes
            </li>
          )}

          {movie.genres && movie.genres.length > 0 && (
            <li className="text-xs text-[#8b8b8b] w-auto block float-left font-semibold mr-1.5 font-sans overflow-auto">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="fa-regular"
              />{" "}
              {movie.genres.map((genre) => genre.name).join(", ")}
            </li>
          )}

          {movie.release_date && (
            <li className="text-xs text-[#8b8b8b] w-auto block float-left font-semibold mr-1.5 font-sans overflow-auto">
              <FontAwesomeIcon icon={faCalendar} className="fa-regular" />{" "}
              {dateConverter(movie.release_date)}
            </li>
          )}

          {movie.spoken_languages && movie.spoken_languages.length > 0 && (
            <li className="text-xs text-[#8b8b8b] w-auto block float-left font-semibold mr-1.5 font-sans overflow-auto">
              <FontAwesomeIcon
                icon={faLanguage}
                className="fa-solid fa-language"
              />{" "}
              {movie.spoken_languages
                .map((language) => language.english_name)
                .join(", ")}
            </li>
          )}

          {movie.production_countries &&
            movie.production_countries.length > 0 && (
              <li className="text-xs text-[#8b8b8b] w-auto block float-left font-semibold mr-1.5 font-sans overflow-auto">
                <FontAwesomeIcon
                  icon={faGlobe}
                  className="fa-solid fa-global"
                />{" "}
                {movie.production_countries
                  .map((country) => country.name)
                  .join(", ")}
              </li>
            )}
        </ul>
      )}
    </div>
  );
};

const MoviePlot: React.FC<{ movie: Partial<RawMovie> }> = ({ movie }) => {
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
            {movie.overview}
          </p>
        </div>
      </div>
    </>
  );
};

const MovieDetail: React.FC<{ movie: Partial<RawMovie> }> = ({ movie }) => {
  return (
    movie && (
      <div className="space-y-1 mx-1 mt-5">
        <div className="h-5 mb-2">
          <p className="text-lg font-light text-[#e7e7e7] italic m-0 font-sans">
            <FontAwesomeIcon icon={faClapperboard} className="fa-regular" />{" "}
            {movie.Director}
          </p>
        </div>
        <div className="h-5 mb-2">
          <p className="text-lg font-light text-[#e7e7e7] italic m-0 font-sans">
            <FontAwesomeIcon icon={faPencil} className="fa-regular" />{" "}
            {movie.Writer}
          </p>
        </div>
      </div>
    )
  );
};

const MovieRating: React.FC<{ movie: Partial<RawMovie> }> = ({ movie }) => {
  const imageSources: Record<string, string> = {
    "Internet Movie Database": imdbLogo,
    "Rotten Tomatoes": rottenTomatoesLogo,
    Metacritic: metacriticLogo,
  };
  const ratings = movie.Ratings || [];
  const awards = movie.Awards || "";

  if (!movie.imdbID || ratings.length === 0) {
    return null; // Return null if imdbID is not available or if there are no ratings
  }

  return (
    <div>
      <div className="block mt-[0%] mb-[0.5%] mx-[0.5%]">
        <h5 className="text-xs text-black m-0 font-montserrat">
          RATINGS & AWARDS
        </h5>
      </div>
      <div className="flex mt-3 w-full">
        {ratings.slice(0, 3).map((rating, index) => (
          <div
            key={index}
            className="text-center flex flex-col items-center mx-auto w-1/4"
          >
            <img
              src={imageSources[rating.Source as keyof typeof imageSources]}
              alt={`${rating.Source} logo`}
              className="h-[50px]"
            />
            <p className="text-sm text-[#8b8b8b] w-auto block font-semibold mt-2 font-sans">
              {rating.Value}
            </p>
          </div>
        ))}

        <div className="text-center flex flex-col items-center w-1/4">
          <img src={oscarImg} alt="oscar" className="h-[50px]" />
          {awards.split(".").map((award, index) => (
            <div key={index}>
              <p className="text-sm text-[#8b8b8b] w-auto block font-semibold mt-2 font-sans">
                {award}.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ActionButton: React.FC<{ movie: Partial<RawMovie> }> = ({ movie }) => {
  return (
    <div className="w-full after:clear-both before:content-[''] after:content-[''] before:table after:table zoom-100 action-row">
      <div className="w-[50%] float-left block mt-[0%] mb-[0.5%] mx-[0.5%] p-[1%]  ">
        <div className="watch-btn">
          <h3 className="text-sm text-[#fe4141] m-0 font-montserrat">
            <FontAwesomeIcon icon={faPlay} className="fa-solid fa-play" /> WATCH
            TRAILER
          </h3>
        </div>
      </div>
      <div className="w-[13.6666666667%] float-left block mt-[0%] mb-[0.5%] mx-[0.5%] p-[1%]   action-btn">
        <FontAwesomeIcon
          icon={faFloppyDisk}
          className="fa-solid fa-floppy-disk"
          style={{ color: "#fe4141" }}
        />
      </div>
      <div className="w-[13.6666666667%] float-left block mt-[0%] mb-[0.5%] mx-[0.5%] p-[1%]   action-btn">
        <FontAwesomeIcon
          icon={faBookmark}
          className="fa-solid fa-bookmark"
          style={{ color: "#fe4141" }}
        />
      </div>
      <div className="w-[13.6666666667%] float-left block mt-[0%] mb-[0.5%] mx-[0.5%] p-[1%]   action-btn">
        <FontAwesomeIcon
          icon={faShareNodes}
          className="fa-light fa-share-nodes"
          style={{ color: "#fe4141" }}
        />
      </div>
    </div>
  );
};

const AlertForm: React.FC<{ success: boolean | null }> = ({ success }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (success !== null) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [success]);

  if (!visible) {
    return null; // Hide the component
  }

  return success ? (
    <div className="text-center" id="message">
      <div className="flex justify-center items-center">
        <FontAwesomeIcon
          icon={faCircleCheck}
          className="fa-regular fa-circle-check"
          style={{ color: "#6afb09" }}
        />
        <p className="text-[#6afb09]">Movie updated successfully!</p>
      </div>
    </div>
  ) : (
    <div className="text-center ml-2" id="message">
      <div className="flex justify-center items-center">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="fa-regular fa-circle-xmark"
          shake
          style={{ color: "#ff0000" }}
        />{" "}
        <p className="text-[#ff0000]">An error happened!</p>
      </div>
    </div>
  );
};

const Actors: React.FC<{ queries: string[] | undefined }> = ({ queries }) => {
  const [actors, setActors] = useState<Actor[]>([]);

  useEffect(() => {
    if (!queries) {
      return;
    }

    const fetchActor = async (name: string) => {
      return await ActorService.fetchActorData(name);
    };

    const promises = queries.map(fetchActor);

    Promise.all(promises).then((data) => {
      const results = data.filter(Boolean) as Actor[];
      setActors(results as Actor[]);
    });
  }, [queries]);

  return (
    <>
      <div className="w-full after:clear-both before:content-[''] after:content-[''] before:table after:table zoom-100 mt-3">
        <div className="w-[47%] float-left block mt-[0%] mb-[0.5%] mx-[0.5%]">
          <h5 className="text-xs text-black m-0 font-montserrat">ACTORS</h5>
        </div>
      </div>

      <div className="flex items-center">
        {actors.map((actor) => (
          <div
            key={actor.results[0].id}
            className="text-center flex flex-col items-center mx-auto"
          >
            <img
              src={
                actor.results[0].profile_path
                  ? `https://image.tmdb.org/t/p/w500/${actor.results[0].profile_path}`
                  : actorDefaultPFP
              }
              alt={`${actor.results[0].name} profile picture`}
              className="h-[100px]"
            />
            <p className="text-sm text-[#8b8b8b] w-auto block font-semibold mt-2 font-sans">
              {actor.results[0].name}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

const ProductionCompanies: React.FC<{ movie: Partial<RawMovie> }> = ({
  movie,
}) => {
  const baseLogoUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <>
      <div className="w-full after:clear-both before:content-[''] after:content-[''] before:table after:table zoom-100 mt-3">
        <div className="w-[47%] float-left block mt-[0%] mb-[0.5%] mx-[0.5%]">
          <h5 className="text-xs text-black m-0 font-montserrat">COMPANIES</h5>
        </div>
      </div>
      <div className="flex flex-wrap">
        {movie.production_companies?.map((company) => (
          <div
            key={company.id}
            className="text-center flex flex-col items-center w-1/3 p-5 mb-5"
          >
            <img
              src={`${
                company.logo_path
                  ? baseLogoUrl + company.logo_path
                  : companyDefault
              }`}
              alt={`${company.name} logo`}
              className="h-[100px]"
            />
            <p className="text-sm text-[#8b8b8b] w-auto block font-semibold mt-2 font-sans">
              {company.name}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};
