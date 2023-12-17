import "./App.css";
import { Routes, Route } from "react-router";
import NavBar from "./components/navbar";
import ListMovieComponent from "./pages/Movie";
import { BrowserRouter as Router } from "react-router-dom";
import AdminRouter from "./routes/AdminRouter/AdminRouter";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
function App() {
  return (
    <div>
      <NavBar />
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home/>}/> */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/movies" element={<ListMovieComponent />} />
          {/* Include AdminRouter here */}
          <Route path="/admin/*" element={<AdminRouter />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
