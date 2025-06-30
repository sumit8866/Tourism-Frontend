// import React from "react";
// import './App.css';
// import Apicalling from './components/Apicalling';
// import Footer from './components/Footer';
// import Header from './components/Header';
// import Homesection from './components/Homesection'
// import AutoPlay from './components/Slider';
// import ScrollToTop from './components/Topscroll'
// import Sliders from "./components/Slider";

// function App() {
//   return (
//     <>
//     <ScrollToTop></ScrollToTop>
//     <Homesection></Homesection>
//     <Footer></Footer>
//     {/* <Sliders></Sliders> */}
//     {/* <AutoPlay></AutoPlay> */}
//     {/* <Apicalling></Apicalling> */}
    
//     </>
//   );
// }



// export default App;


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Tour from './components/Tour';
import Footer from './components/Footer';
import TourPage from "./components/TourPage";
import Homesection from './components/Homesection';
import About from './components/About';
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
        <Route path="/addlisting" element={<div>Add Listing Page (Placeholder)</div>} />
      </Routes>

      {/* Global Footer */}
      <Footer />
    </Router>
  );
};

export default App;
  



