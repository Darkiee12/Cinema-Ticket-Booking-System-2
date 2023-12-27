import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShowResponse } from "../models/Show";
import ShowService from "../services/ShowService";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

export default function ShowPage() {
  const navigate = useNavigate();
  const imdbId = useParams<{ imdbId: string }>().imdbId;
  const [show, setShow] = useState<ShowResponse[][]>([]);
  const [error, setError] = useState<boolean>(false);
  const [toggle, setToggle] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // useEffect(() => {
  //   alert("Selected date: " + selectedDate);
  // }, [selectedDate]);
  useEffect(() => {
    if (imdbId === undefined) {
      // Redirect to ../movies
      navigate('../movies');
    }
  }, [imdbId, navigate]);
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
      <p className="w-full text-center text-xs italic ">You are booking tickets for {show?.[0]?.[0]?.title || ""}! 
        <a className="text-blue-500 hover:underline" href="../movies"> Incorrect movie?</a>
      </p>
      <div className="w-full h-auto mt-5 justify-center items-center p-1 border-b-2 border-b-blue-400">
        <DatesComponent toggle={toggle} setToggle={setToggle} onDateClick={setSelectedDate} />
      </div>
        <CinemaComponent shows={show} loading={loading} />
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
    <div className="border-2 rounded w-50 h-20 mx-auto flex items-center justify-center hover:bg-blue-400 hover:text-white">
      <p className="text-base">{show.startTime.slice(0, 5)}</p>
    </div>
  );
};


function getFormattedDate(date: Date): string {
  const year: number = date.getFullYear();
  const month: string = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 to the month because months are zero-based
  const day: string = String(date.getDate()).padStart(2, '0');
  const formattedDate: string = `${year}-${month}-${day}`;
  return formattedDate;
}