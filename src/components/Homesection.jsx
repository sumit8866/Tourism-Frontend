import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import AOS from "aos";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Box,
  Typography,
  Button,
  Rating,
  Link
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import herobg1 from "../image/herobgimg.jpg";
import herobg2 from "../image/slider2.jpg";
import herobg3 from "../image/slider3.jpg";
import service1 from "../image/heart.png";
import service2 from "../image/certified.png";
import service3 from "../image/customer-service.png";
import service4 from "../image/search.png";
import about from "../image/about-img.jpg";
import Header from "./Header";
import axios from "axios";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";
import ScrollToTop from './Topscroll'

const slides = [
  {
    background: herobg1,
    title: "NEW TRIP",
    subtitle: "DISCOVER THE COLORFUL WORLD",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    background: herobg2,
    title: "NEW EXPERIENCE",
    subtitle: "EXPLORE THE WILD",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    background: herobg3,
    title: "NEW ADVENTURE",
    subtitle: "SOAK IN THE SUN",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

const details = [
  { logo: service2, title: "Best Price Guarantee", description: "A small river named Duden flows by their place and supplies." },
  { logo: service4, title: "Travellers Love Us", description: "A small river named Duden flows by their place and supplies." },
  { logo: service1, title: "Best Travel Agent", description: "A small river named Duden flows by their place and supplies." },
  { logo: service3, title: "Our Dedicated Support", description: "A small river named Duden flows by their place and supplies." },
];

const CustomNextArrow = ({ onClick }) => (
  <Box onClick={onClick} sx={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", zIndex: 3, cursor: "pointer", color: "white" }}>
    <ArrowForwardIosIcon />
  </Box>
);

const CustomPrevArrow = ({ onClick }) => (
  <Box onClick={onClick} sx={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", zIndex: 3, cursor: "pointer", color: "white" }}>
    <ArrowBackIosNewIcon />
  </Box>
);

const Sliders = () => {
  const navigate = useNavigate();
  const key = "Ofokc8bYPo2MB7Ll";
  const [data, setData] = useState([]);

  const settings = {
    arrows: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  const getdata = () => {
    axios
      .get("https://generateapi.onrender.com/api/detailstour", {
        headers: { Authorization: key },
      })
      .then((res) => setData(res.data.Data))
      .catch((err) => console.error("Fetch error:", err));
  };

  useEffect(() => {
    getdata();
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
    <ScrollToTop></ScrollToTop>
      <Box className="slider-container" style={{ position: "relative" }}>
        <Box sx={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 999 }}>
          <Header />
        </Box>

        <Slider {...settings}>
          {slides.map((slide, idx) => (
            <Box
              key={idx}
              sx={{
                position: "relative",
                height: { xs: "100dvh", md: "100vh" },
                width: "100%",
                backgroundImage: `url(${slide.background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: "white",
              }}
            >
              <Box sx={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1 }} />
              <Box
                sx={{
                  position: "relative",
                  zIndex: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  textAlign: "center",
                  px: 2,
                }}
                data-aos="fade-up"
              >
                <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, letterSpacing: 1, mb: 2 }}>
                    {slide.subtitle}
                  </Typography>
                  <Typography variant="h2" sx={{ fontWeight: 800, mb: 2, fontSize: { xs: "2.5rem", sm: "3rem", md: "4rem" } }}>
                    {slide.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "16px", md: "18px" },
                      mb: 4,
                      maxWidth: "700px",
                      lineHeight: 1.6,
                      fontWeight: 400,
                      mx: "auto",
                    }}
                  >
                    {slide.description}
                  </Typography>
                  <Button
                    href="About"
                    variant="contained"
                    sx={{
                      backgroundColor: "white",
                      color: "black",
                      borderRadius: "30px",
                      px: 4,
                      py: 1.2,
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      border: "1px solid transparent",
                      "&:hover": {
                        backgroundColor: "transparent",
                        color: "white",
                        border: "1px solid white",
                      },
                    }}
                  >
                    DISCOVER NOW
                  </Button>
                </Box>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>

      {/* Service Section */}
      <Box width="80%" margin="auto" marginTop="-100px" data-aos="fade-down">
        <Box sx={{ py: 6, px: { xs: 2, md: 8 }}}>
          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 3 }}>
            {details.map((item, index) => (
              <Box
                key={index}
                data-aos="zoom-in"
                sx={{
                  flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 19%" },
                  textAlign: "center",
                  p: 2,
                  backgroundColor: "white",
                  boxShadow: "2px 2px 9px 2px gray",
                }}
              >
                <Box component="img" src={item.logo} alt={item.title} sx={{ width: 60, height: 60, mb: 2 }} />
                <Typography variant="h6" fontWeight="600" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* About Section */}
      <Box
        data-aos="fade-up"
        sx={{
          width: "90%",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 2, md: 4 },
          py: { xs: 4, md: 6 },
          gap: { xs: 4, md: 0 },
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "60%" }, display: "flex", justifyContent: "center" }}>
          <Box
            component="img"
            src={about}
            alt="About Section"
            sx={{
              width: { xs: "80%", sm: "70%", md: "70%" },
              border: "50px solid",
              borderColor: "transparent #ff0055 transparent #ff0055",
              boxSizing: "border-box",
            }}
          />
        </Box>

        <Box sx={{ width: { xs: "100%", md: "60%" }, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Box sx={{ width: { xs: "80%", sm: "85%", md: "70%" } }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
              We Realize that there are reduced Wastage Stand out
            </Typography>
            {[
              "Inappropriate behavior is often laughed off...",
              "Women face higher conduct standards – especially in the workplace.",
              "That’s why it’s crucial that, as women...",
            ].map((text, index) => (
              <Typography key={index} variant="body2" sx={{ fontSize: "15px", fontWeight: 200, mb: 2 }}>
                {text}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Tour Cards Section */}
      <Box sx={{ px: 2, py: 4 }} data-aos="fade-up">
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 3, maxWidth: "1300px", mx: "auto" }}>
          {data.slice(0, 4).map((item) => (
            <Box
              key={item._id}
              data-aos="zoom-in-up"
              sx={{
                border: "1px solid #ccc",
                borderRadius: 2,
                maxWidth: "280px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                textAlign: "center",
                m: 1,
              }}
            >
              {item.image.length > 0 && (
                <Box
                  component="img"
                  src={item.image[0]}
                  alt="Tour"
                  sx={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
              )}
              <Box sx={{ p: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1, height: "80px" }}>
                  <Typography sx={{ fontSize: "18px", fontWeight: "bold", textAlign: "start", flex: 1, pr: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="subtitle1" color="primary">
                    ${item.price}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
                  <Rating size="small" value={item.rating} readOnly />
                  <Typography variant="body2" fontWeight={300}>
                    {item.ratingCount} Rating
                  </Typography>
                </Box>
                <Typography variant="body2" color="gray" mb={1} textAlign="start" sx={{ overflow: "hidden", height: "100px" }}>
                  {item.description}
                </Typography>
                <Typography variant="body2" color="blue" mb={1} textAlign="start">
                  {item.day} <span style={{ color: "black" }}>Days</span> / {item.night} <span style={{ color: "black" }}>Nights</span>
                </Typography>
                <Box textAlign="center">
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 1 }}>
                    <LocationOnIcon fontSize="small" color="action" />
                    <Typography variant="body2">{item.location.toUpperCase()}</Typography>
                  </Box>
                  <Link href="/tour" underline="none">
                    <Button size="small" variant="contained" color="success" sx={{ px: 5, py: 1 }}>
                      Discover
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Sliders;
