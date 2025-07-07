import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Tour from "./components/tour/Tour";
import Footer from "./components/layouts/Footer";
import TourPage from "./pages/TourPage";
import Homesection from "./pages/Homesection";
import About from "./pages/About";
import Hotels from "./components/hotel/Hotels";
import Contact from "./pages/Contact";
import Header from "./components/layouts/Header";
import ScrollToTop from './components/common/Topscroll'
import Admin from "./pages/Admin";
import HotelPage from "./pages/HotelPage";
import Login from "./pages/Login";

const App = () => {
  return (
    <Router>
      <ScrollToTop/>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Homesection />} />
        <Route path="/home" element={<Homesection />} />
        <Route path="/about" element={<About />} />
        <Route path="/tour" element={<Tour />} />
        <Route path="/tour/:id" element={<TourPage />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/hotel/:id" element={<HotelPage />} />
        
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
