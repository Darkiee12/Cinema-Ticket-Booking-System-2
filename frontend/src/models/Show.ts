import { Movie } from "./Movie";

export default interface Show{
  showId: number;
  auditoriumId: number;
  cinemaId: number;
  imdbId: string;
  date: Date;
  startTime: string;
  endTime: string;
  movie?: Movie;
}

export default interface Show{
  auditoriumName: string;
  cinemaName: string;
  title: string;
}

export interface ShowResponse {
  showId: number;
  imdbId: string;
  title: string;
  startTime: string;
  endTime: string;
  auditoriumId: number;
  auditoriumName: string;
  cinemaId: number;
  cinemaName: string;
}

export interface ShowFull {
  showId: number;
  date: string;
  startTime: string;
  endTime: string;
  auditorium: Auditorium;
}

interface Auditorium{
  auditoriumId: number;
  name: string;
  seats: number;
  cinema: Cinema;
  auditoriumSeats: AuditoriumSeat[];
  shows: Show[]
}

interface Cinema {
  cinemaId: number;
  name: string;
  capacity: number;
  address: string;
  phoneNumber: number;
  email: string;
}
export interface AuditoriumSeat {
  auditoriumSeatId: number;
  seatNumber: number;
  type: string;
  showSeats: ShowSeat[];
}

export interface ShowSeat {
  showSeatId: number;
  name?: string;
  status: string;
  ticket: any; 
}
export function transformShows(inputArray: any[][]): ShowResponse[][] {
  const groupedMovies: { [key: string]: ShowResponse[] } = {};

  inputArray.forEach((item) => {
    const [showId, imdbId, title, startTime, endTime, auditoriumId, auditoriumName, cinemaId, cinemaName] = item;

    if (!groupedMovies[cinemaName]) {
      groupedMovies[cinemaName] = [];
    }

    const movie: ShowResponse = {
      showId,
      imdbId,
      title,
      startTime,
      endTime,
      auditoriumId,
      auditoriumName,
      cinemaId,
      cinemaName,
    };

    groupedMovies[cinemaName].push(movie);
  });

  return Object.values(groupedMovies);
}
