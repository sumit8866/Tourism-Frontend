import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Tour from "./components/Tour";
import Footer from "./components/Footer";
import TourPage from "./components/TourPage";
import Homesection from "./components/Homesection";
import About from "./components/About";
import Hotels from "./components/Hotels";
import Contact from "./components/Contact";
import Header from "./components/Header";

const App = () => {
  return (
    <Router>
      {/* Global Header (shown on all pages) */}
      <Header />

      {/* Main Content Routing */}
      <Routes>
        <Route path="/" element={<Homesection />} />
        <Route path="/home" element={<Homesection />} />
        <Route path="/about" element={<About />} />
        <Route path="/tour" element={<Tour />} />
        <Route path="/tour/:id" element={<TourPage />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/addlisting"
          element={<div>Add Listing Page (Placeholder)</div>}
        />
      </Routes>

      {/* Global Footer */}
      <Footer />
    </Router>
  );
};

export default App;
