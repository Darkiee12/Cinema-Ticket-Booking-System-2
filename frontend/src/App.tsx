import "./App.css";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import ListUserComponent from "./components/ListUserComponent";
import ListMovieComponent from "./components/ListMovieComponent";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router";
import AddMovieComponent from "./components/AddMovieComponent";
import AdminRouter from "./routes/AdminRouter/AdminRouter";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/users/*"
            element={
              <div>
                <HeaderComponent />
                <div className="container">
                  <Routes>
                    <Route path="/users" element={<ListUserComponent />} />
                  </Routes>
                </div>
                <FooterComponent />
              </div>
            }
          />
          <Route path="/add-movies" element={<AddMovieComponent />} />
          <Route path="/movies" element={<ListMovieComponent />} />
          {/* Include AdminRouter here */}
          <Route path="/admin/*" element={<AdminRouter />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
