import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Show, { TransformedCinema, TransformedShow, getShowsFromCInemasFromImdbId } from "../models/Show";
import { Response } from "../utils/api";
import ShowService from "../services/ShowService";
import Loading from "../components/Loading";
// Inside ShowPage component
export default function ShowPage() {
  const imdbId = useParams<{ imdbId: string }>().imdbId;
  const [show, setShow] = useState<Show[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [toggle, setToggle] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await ShowService.getShowFromMovie(imdbId!);
        setLoading(false);
        setShow(response instanceof Array ? response : []);
        setError(response instanceof Array ? null : (response as Response).message);
      } catch (error) {
        setError('An error occurred while fetching data.');
      }
    };

    if (show.length === 0 && error === null) {
      fetchData();
    }
  }, [show, error]);
  return (
    <div className="w-full h-full">
      <div className="w-full h-auto mt-5 justify-center items-center p-1 border-b-2 border-b-blue-400">
        <DatesComponent toggle={toggle} setToggle={setToggle} onDateClick={setCurrentDate} />
      </div>
      {loading && <Loading />}
      <div className="w-full mt-2">
        <CinemasComponent shows={show} date={currentDate} />
      </div>
    </div>
  );
}

// Inside DatesComponent
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

// Inside DateComponent
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


const CinemasComponent = ({ shows, date }: { shows: Show[], date: Date }) => {
  const cinemas = getShowsFromCInemasFromImdbId(shows)
    .cinema
    // .filter((cinema) =>
    //   {
    //     console.log("From database:", cinema.date)
    //     console.log("From selection: ", date);
    //     cinema.date == date
    //   }
    // );
  return (
    <div className="w-full border-b-2 border-b-gray-400 p-2 mb-2">
      {cinemas.map((cinema, i) => {
        return <CinemaComponent key={i} cinema={cinema} />
      })}
    </div>
  )
}

const CinemaComponent: React.FC<{ cinema: TransformedCinema }> = ({ cinema }) => {
  return (
    <div className="w-full">
      <p className="font-bold text-2xl">{cinema.cinemaName}</p>
      <div className="flex flex-wrap">
        {cinema.shows.map((show, i) => (
          <div key={i} className="w-1/5 p-2">
            <ShowComponent show={show} />
          </div>
        ))}
      </div>

    </div>
  );
};


const ShowComponent: React.FC<{ show: TransformedShow }> = ({ show }) => {
  return (
    <div className="border-2 rounded w-50 h-20 mx-auto flex items-center justify-center hover:bg-blue-400 hover:text-white">
      <p className="text-base">{show.startTime}</p>
    </div>
  );
}