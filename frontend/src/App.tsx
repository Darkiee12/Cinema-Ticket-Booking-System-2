import "./App.css";
import { Routes, Route } from "react-router";
import NavBar from "./components/navbar";
import ListMovieComponent from "./pages/MoviePage";
import { BrowserRouter as Router } from "react-router-dom";
import AdminRouter from "./routes/AdminRouter/AdminRouter";
import LoginSignUp from "./pages/Login";
function App() {
  return (
    <div>
      <NavBar />
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home/>}/> */}
          <Route path="/login" element={<LoginSignUp />} />
          <Route path="/movies" element={<ListMovieComponent />} />
          {/* Include AdminRouter here */}
          <Route path="/admin/*" element={<AdminRouter />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
