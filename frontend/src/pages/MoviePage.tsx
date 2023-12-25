import React, { useState, FormEvent } from "react";
import MovieService from "../services/MovieService";
import { Movie } from "../models/Movie";
import { Box, Button, TextField } from "@mui/material";
import { } from "@mui/material";
import Loading from "../components/Loading";

const MoviePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const sqlQuery: string = data.get("sql") as string;
    const result = await MovieService.getMoviesByQuery(sqlQuery);
    result instanceof Array ? setMovies(result) : setError(result!.message);
    setLoading(false);
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
      {loading && <Loading />}
      {error && <div className="w-full text-red-500 italic text-xs">{error}</div>}
      {!loading && (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {movies.map((movie, index) => (
          <MovieComponent key={index} movie={movie} />
        ))}
      </div>)}
    </div>
  );
};

export default MoviePage;

const MovieComponent: React.FC<{ movie: Movie }> = ({ movie }) => {
  return (
    <div>
      <div className="p-3 min-h-[80vh]">
        <div>
          <img src={movie.poster} alt={movie.title} />
        </div>
        <div>
          <strong className="text-2xl">{movie.title}</strong>
          <CsvComponent name="Genre" data={movie.genre} displayKey="name" />
          <p><b>Runtime: </b>{movie.runtime} minutes.</p>
          <CsvComponent name="Languages" data={movie.language} displayKey="englishName" />
          <p><b>Released: </b>{movie.released}</p>
        </div>
      </div>
      <div className="flex space-x-1 p-3">
        <Button variant="contained" href="#" className="w-1/2 p-3 h-3rem text-5xl font-bold"> Detail </Button>
        <Button variant="contained" color="success" href="#" className="w-1/2 p-3 h-3rem text-5xl font-bold"> Book </Button>
      </div>

    </div>
  )
}

function CsvComponent<T>(props: { name: string, data: T[], displayKey: keyof T }) {
  const formatArrayToCSV = (array: any[]) => {
    return array.map(item => item[props.displayKey]).join(', ');
  };

  const formattedCSV = formatArrayToCSV(props.data);

  return <p><b>{props.name}: </b>{formattedCSV}</p>;

}

