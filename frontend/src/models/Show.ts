export default interface Show{
  showId: number;
  auditoriumId: number;
  cinemaId: number;
  imdbId: string;
  date: Date;
  startTime: string;
  endTime: string;
}

export default interface Show{
  auditoriumName: string;
  cinemaName: string;
  title: string;
}

export interface ShowResponse {
  imdbId: string;
  title: string;
  startTime: string;
  endTime: string;
  auditoriumId: number;
  auditoriumName: string;
  cinemaId: number;
  cinemaName: string;
}

export function transformShows(inputArray: any[][]): ShowResponse[][] {
  const groupedMovies: { [key: string]: ShowResponse[] } = {};

  inputArray.forEach((item) => {
    const [imdbId, title, startTime, endTime, auditoriumId, auditoriumName, cinemaId, cinemaName] = item;

    if (!groupedMovies[cinemaName]) {
      groupedMovies[cinemaName] = [];
    }

    const movie: ShowResponse = {
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
