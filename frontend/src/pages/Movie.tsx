import { useState, useEffect, FormEvent } from "react";
import MovieService from "../services/MovieService";
import { Movie } from "../models/Movie";
import { Box, Button, TextField } from "@mui/material";

export default function ListMovieComponent(): JSX.Element {
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    MovieService.getMovies().then((fetchedMovies: Movie[]|null) => {
      if (fetchedMovies) setMovies(fetchedMovies);
      else alert("Failed to fetch movies");
    });
  }, []);
  
 
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const sqlQuery: string = data.get("sql") as string;
    try{
      MovieService.getMoviesByQuery(sqlQuery).then((fetchedMovies: Movie[]|null) => {
        if(fetchedMovies)setMovies(fetchedMovies);
        else alert("Failed to fetch movies");
      });
    } catch(error){
      alert(error);
    }
  }
  let allkeys: (keyof Movie)[];
  if(movies.length != 0){
    console.log(movies);
    allkeys = Object.keys(movies[0]) as (keyof Movie)[]
  }
  return (
    <div>
      <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
      >
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
                sx={{ mt: 3, mb: 2, width:"10rem" }}
              >
                <div className="text-xl">Search</div>
          </Button>
        </div>
      </Box>
      {allkeys! !== undefined} && <MovieTable movies={movies} allkeys={allkeys!}/>
    </div>
  );
}
interface MovieTableProps {
  movies: Array<{ imdbId: string; [key: string]: any }>;
  allkeys: (keyof Movie)[];
}

const MovieTable: React.FC<MovieTableProps> = ({ movies, allkeys }) => {
  return (
    <div>
      {movies.length !== 0 && (
        <div className="row overflow-x-auto">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                {allkeys.map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie.imdbId}>
                  {allkeys.map((key) => (
                    <td key={key}>{`${movie[key]}`}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};