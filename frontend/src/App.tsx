import "./App.css";
import { Routes, Route } from "react-router";
import NavBar from "./components/navbar.tsx";
import ListMovieComponent from "./pages/MoviePage.tsx";
import ShowPage from "./pages/ShowPage.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import AdminRouter from "./routes/AdminRouter/AdminRouter.tsx";
import Login from "./pages/Login.tsx";
import SignUp from "./pages/SignUp.tsx";
import ListUserComponent from "./pages/User.tsx";
import Booking from "./pages/Booking.tsx";
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
