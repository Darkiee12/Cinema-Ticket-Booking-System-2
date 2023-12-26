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


export interface TransformedShow {
  showId: number;
  auditoriumName: string;
  cinemaName: string;
  startTime: string;
  endTime: string;
}

export interface TransformedCinema {
  date: Date;
  cinemaName: string;
  cinemaId: number; // You might want to add a cinemaId or some identifier for the cinema
  shows: TransformedShow[];
}

interface TransformedData {
  imdbId: string;
  title: string;
  cinema: TransformedCinema[];
}

export function getShowsFromCInemasFromImdbId(originalData: Show[]): TransformedData {
  const transformedData: TransformedData = {
      imdbId: "",
      title: "",
      cinema: [],
  };

  originalData.forEach((originalShow) => {
      // Check if the imdbId and title are not set in the transformedData
      if (!transformedData.imdbId) {
          transformedData.imdbId = originalShow.imdbId;
          transformedData.title = originalShow.title;
      }

      // Find or create the cinema in the transformedData
      let cinema = transformedData.cinema.find(
          (c) => c.cinemaName === originalShow.cinemaName
      );

      if (!cinema) {
          cinema = {
              date: originalShow.date,
              cinemaName: originalShow.cinemaName,
              cinemaId: transformedData.cinema.length + 1, // Assign a unique cinemaId
              shows: [],
          };
          transformedData.cinema.push(cinema);
      }

      // Add the transformed show data to the cinema
      const transformedShow: TransformedShow = {
          showId: originalShow.showId,
          auditoriumName: originalShow.auditoriumName,
          cinemaName: originalShow.cinemaName,
          startTime: originalShow.startTime,
          endTime: originalShow.endTime,
      };

      cinema.shows.push(transformedShow);
  });

  return transformedData;
}