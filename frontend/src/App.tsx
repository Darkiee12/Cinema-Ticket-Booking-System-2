import "./App.css";
import { Routes, Route } from "react-router";
import NavBar from "./components/navbar";
import ListMovieComponent from "./pages/MoviePage";
import ShowPage from "./pages/ShowPage";
import { BrowserRouter as Router } from "react-router-dom";
import AdminRouter from "./routes/AdminRouter/AdminRouter";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ListUserComponent from "./pages/User";
import Booking from "./pages/Booking";
function App() {
  return (
    <div className="w-full min-h-screen">
      <NavBar />
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home/>}/> */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<ListUserComponent/>} /> 
          <Route path="/movies" element={<ListMovieComponent />} />
          <Route path="/shows/:imdbId" element={<ShowPage />} />
          <Route path="/booking/:showId" element={<Booking />} />
          {/* Include AdminRouter here */}
          <Route path="/admin/*" element={<AdminRouter />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
