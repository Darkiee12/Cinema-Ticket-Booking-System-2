import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ShowService from '../services/ShowService';
import { AuditoriumSeat, ShowFull, ShowSeat } from '../models/Show';
import Loading from '../components/Loading';

export default function Booking() {
  const showId = useParams<{ showId: string }>().showId;
  const [loading, setLoading] = React.useState<boolean>(true);
  const [selectedSeats, setSelectedSeats] = React.useState<ShowSeat[]>([]);
  const [show, setShow] = React.useState<ShowFull | null>(null);

  const fetchShow = async () => {
    setShow(null);
    setLoading(true);
    const res = await ShowService.getShowFromId(parseInt(showId || '0'));
    if (res instanceof Response) {
    } else {
      setLoading(false);
      setShow(res as ShowFull);
    }
  }

  const handleSeatClick = (selectedSeat: ShowSeat) => {
    const isSeatSelected = selectedSeats.some(
      (seat) => seat.showSeatId === selectedSeat.showSeatId
    );

    if (isSeatSelected) {
      setSelectedSeats((prevSelectedSeats) =>
        prevSelectedSeats.filter(
          (seat) => seat.showSeatId !== selectedSeat.showSeatId
        )
      );
    } else {
      setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, selectedSeat]);
    }
  };

  useEffect(() => {
    fetchShow();
  }, []);

  return (
    <div className="w-full mt-5">
      <div className="flex">
        <div className="w-[80%] pl-2">
          <Preview show={show} onSeatClick={handleSeatClick} />
        </div>
        <div className="w-[20%] pr-2">
          <Annotation show={show} selectedSeat={selectedSeats} />
          <button
            className={`font-bold text-white ${selectedSeats.length === 0 ? "bg-gray-500" : "bg-green-500"} w-full h-10 mt-2 ${selectedSeats.length === 0 ? '' : 'hover:bg-green-200'
              }`}
            onClick={() => { }}
            disabled={selectedSeats.length === 0}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

const Preview: React.FC<{ show: ShowFull | null; onSeatClick: (selectedSeat: ShowSeat) => void }> = ({ show, onSeatClick }) => {
  return (
    <div className="w-full border-black border-solid ">
      <div className="text-center text-5xl font-bold">SCREEN</div>
      <div>
        <div className="bg-black w-full h-5 mt-3 rounded-tl-[50%] rounded-tr-[50%]" />
      </div>
      <div className="w-full h-20"></div>
      <div className="w-full flex flex-col">
        {show ? (
          <div className="grid grid-cols-10 gap-1">
            {show.auditorium.auditoriumSeats.map((seat, index) => (
              <div key={index} className="p-1">
                <Seat seat={seat} onSeatClick={onSeatClick} />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full pt-20">
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
};


const Annotation: React.FC<{ show: ShowFull | null; selectedSeat: ShowSeat[] }> = ({ show, selectedSeat }) => {
  return (
    <div className="h-[90%] pl-2">
      {show && (
        <div className="h-[20rem]">
          <PosterComponent poster={show.auditorium.shows[0].movie!.poster} />
        </div>
      )}
      <div>     {show &&
        (<div>
          <p className="font-bold text-2xl text-center">{show.auditorium.shows[0].movie!.title}</p>
          <p className="italic">{show.startTime} ~ {show.endTime}</p>
          <p>{show.auditorium.name}</p>
          <p>{show.auditorium.cinema.name}</p>
        </div>)
      }
      </div>
      <div className="flex">
        <p>Your selection</p>
        <CsvComponent data={selectedSeat} displayKey="name" />
      </div>
      <div className="w-full mt-1">
        <div className="flex">
          <div className="w-5 h-5 bg-gray-500 mr-2" />Available
        </div>
        <div className="flex">
          <div className="w-5 h-5 bg-red-500 mr-2" /> Unavailable
        </div>
        <div className="flex">
          <div className="w-5 h-5 bg-yellow-500 mr-2" /> Reserved
        </div>
        <div className="flex">
          <div className="w-5 h-5 bg-green-500 mr-2" /> Selected
        </div>
      </div>
    </div>
  )
}

const Seat: React.FC<{ seat: AuditoriumSeat; onSeatClick: (selectedSeat: ShowSeat) => void }> = ({ seat, onSeatClick }) => {
  const seatStatusColor = getSeatStatusColor(seat.showSeats[0].status);
  const name = `${String.fromCharCode(Math.floor((seat.seatNumber - 1) / 10) + 65)}${(seat.seatNumber - 1) % 10 + 1}`;
  return (
    <button
      className={`w-full h-10 flex items-center justify-center text-white hover:bg-green-200 hover:text-black ${seatStatusColor}`}
      onClick={() => {
        const newSeatType = seat.showSeats[0].status === 'AVAILABLE' ? 'SELECTED' : 'AVAILABLE';
        seat.showSeats[0].status = newSeatType;
        seat.showSeats[0].name = name;
        onSeatClick({ showSeatId: seat.showSeats[0].showSeatId, status: newSeatType, ticket: null, name: name });
      }}
      disabled={seat.type === "UNAVAILABLE" || seat.type === "RESERVED"}
    >
      <p className="font-bold">{name}</p>
    </button>
  )
}

function getSeatStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'available':
      return 'bg-gray-500';
    case 'unavailable':
      return 'bg-red-500';
    case 'reserved':
      return 'bg-yellow-500';
    case 'selected':
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
}

const PosterComponent: React.FC<{ poster: string }> = ({ poster }) => {
  return (
    <div className="h-full flex justify-center items-center">
      <img
        alt="poster"
        className="w-auto h-full bg-center bg-no-repeat bg-cover rounded-tl-lg rounded-tr-lg"
        src={poster}
      />
    </div>
  );
};


function CsvComponent<T>(props: { name?: string, data: T[], displayKey: keyof T }) {
  const formatArrayToCSV = (array: any[]) => {
    return array.map(item => item[props.displayKey]).join(', ');
  };

  const formattedCSV = formatArrayToCSV(props.data);

  return <p><b>{props.name}: </b>{formattedCSV}</p>;

}

