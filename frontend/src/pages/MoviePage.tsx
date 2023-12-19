import React, { useState, useEffect, FormEvent } from "react";
import MovieService from "../services/MovieService";
import { Movie } from "../models/Movie";
import { Box, Button, TextField } from "@mui/material";
import {} from "@mui/material";

const MovieTable: React.FC<{ movies: Movie[] }> = ({ movies }) => {
  return (
    <div>
      <div className="row px-2">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Title</th>
              <th>Year</th>
              <th>Duration</th>

              {/* Add more table headers for Actors, Directors, Language, Genre, etc. */}
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.imdbId}>
                <td>{movie.title}</td>
                <td>{movie.year}</td>
                <td>{movie.runtime}</td>
                {/* Add more table cells for Actors, Directors, Language, Genre, etc. */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const MoviePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  // useEffect(() => {
  //   MovieService.getMovies().then((fetchedMovies: Movie[] | null) => {
  //     if (fetchedMovies) setMovies(fetchedMovies);
  //     else alert("Failed to fetch movies");
  //   });
  // }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const sqlQuery: string = data.get("sql") as string;
    try {
      const fetchedMovies = await MovieService.getMoviesByQuery(sqlQuery);
      if (fetchedMovies) setMovies(fetchedMovies);
      else alert("Failed to fetch movies");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <div className="flex">
          <TextField
            margin="normal"
            required
            fullWidth
            id="sql"
            placeholder="Enter SQL Query"
            label="SQL Query"
            name="sql"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, width: "10rem", height: "100%" }}
          >
            <div className="text-xl">Search</div>
          </Button>
        </div>
      </Box>
      {/* <MovieTable movies={movies} /> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {movies.map((movie, index) => (
          <MovieComponent key={index} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MoviePage;

const MovieComponent: React.FC<{ movie: Movie }> = ({ movie }) => {
  return (
    <div className="p-3">
      <div>
        <img src={movie.poster} alt={movie.title} />
      </div>
      <div>
        <strong className="text-2xl">{movie.title}</strong>
        <CsvComponent name="Genre" data={movie.genre} displayKey="name" />
        <p><b>Runtime: </b>{movie.runtime} minutes.</p>
        <CsvComponent name="Languages" data={movie.language} displayKey="englishName"/>
        <p><b>Released: </b>{movie.released}</p>
      </div>
    </div>
  )
}



function CsvComponent<T>(props: {name: string, data: T[], displayKey: keyof T}){
  const formatArrayToCSV = (array: any[]) => {
    return array.map(item => item[props.displayKey]).join(', ');
  };

  const formattedCSV = formatArrayToCSV(props.data);

  return <p><b>{props.name}: </b>{formattedCSV}</p>;

}

