import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import AOS from "aos";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Typography, Button, Rating, Link } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import herobg1 from "../assets/image/herobgimg.jpg";
import herobg2 from "../assets/image/slider2.jpg";
import herobg3 from "../assets/image/slider3.jpg";
import service1 from "../assets/image/heart.png";
import service2 from "../assets/image/certified.png";
import service3 from "../assets/image/customer-service.png";
import service4 from "../assets/image/search.png";
import about from "../assets/image/about-img.jpg";
import Header from "../components/layouts/Header";
import axios from "axios";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "../components/common/Topscroll";
import bg_1 from "../assets/image/bg_1.jpg";
import { useSelector,useDispatch } from "react-redux";
import { fetchTours } from "../redux/slices/tourSlice";
import { fetchHotels } from "../redux/slices/hotelSlice";
import { fetchReviews } from "../redux/slices/reviewSlice";

const slides = [
  {
    background: herobg1,
    title: "NEW TRIP",
    subtitle: "DISCOVER THE COLORFUL WORLD",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    background: herobg2,
    title: "NEW EXPERIENCE",
    subtitle: "EXPLORE THE WILD",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    background: herobg3,
    title: "NEW ADVENTURE",
    subtitle: "SOAK IN THE SUN",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

const details = [
  {
    logo: service2,
    title: "Best Price Guarantee",
    description: "A small river named Duden flows by their place and supplies.",
  },
  {
    logo: service4,
    title: "Travellers Love Us",
    description: "A small river named Duden flows by their place and supplies.",
  },
  {
    logo: service1,
    title: "Best Travel Agent",
    description: "A small river named Duden flows by their place and supplies.",
  },
  {
    logo: service3,
    title: "Our Dedicated Support",
    description: "A small river named Duden flows by their place and supplies.",
  },
];

const stats = [
  { number: "100,000", label: "Happy Customers" },
  { number: "40,000", label: "Destination Places" },
  { number: "87,000", label: "Hotels" },
  { number: "56,400", label: "Restaurant" },
];

const CustomNextArrow = ({ onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      position: "absolute",
      right: 20,
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 3,
      cursor: "pointer",
      color: "white",
    }}
  >
    <ArrowForwardIosIcon />
  </Box>
);

const CustomPrevArrow = ({ onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      position: "absolute",
      left: 20,
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 3,
      cursor: "pointer",
      color: "white",
    }}
  >
    <ArrowBackIosNewIcon />
  </Box>
);

const Sliders = () => {
  
  
  

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
  

  


 

  const dispatch = useDispatch();

   const tours = useSelector((state) => state.tours.tours);
  const toursStatus = useSelector((state) => state.tours.status);
  const hotels = useSelector((state) => state.hotels.hotels);
  const hotelsStatus = useSelector((state) => state.hotels.status);
  const reviews = useSelector((state) => state.reviews.reviews);
  const reviewsStatus = useSelector((state) => state.reviews.status);

  useEffect(() => {
    if (toursStatus === "idle") {
      dispatch(fetchTours());
    }
    if (hotelsStatus === "idle") {
      dispatch(fetchHotels());
    }
    if (reviewsStatus === "idle") {
      dispatch(fetchReviews());
    }
  }, [dispatch, toursStatus, hotelsStatus, reviewsStatus]);
  useEffect(() => {
    // getdata();
    AOS.init({ duration: 500, once: true });
  }, []);

  return (
    <>
      <ScrollToTop></ScrollToTop>
      <Box className="slider-container" style={{ position: "relative" }}>
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 999,
          }}
        >
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
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  zIndex: 1,
                }}
              />
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
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, letterSpacing: 1, mb: 2 }}
                  >
                    {slide.subtitle}
                  </Typography>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 800,
                      mb: 2,
                      fontSize: { xs: "2.5rem", sm: "3rem", md: "4rem" },
                    }}
                  >
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
        <Box sx={{ py: 6, px: { xs: 2, md: 8 } }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 3,
            }}
          >
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
                <Box
                  component="img"
                  src={item.logo}
                  alt={item.title}
                  sx={{ width: 60, height: 60, mb: 2 }}
                />
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
          // width: "90%",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 2, md: 4 },
          py: { xs: 4, md: 6 },
          gap: { xs: 4, md: 0 },
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "60%" },
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src={about}
            alt="About Section"
            sx={{
              width: { xs: "80%", sm: "70%", md: "70%" },
              border: "50px solid",
              borderColor: "transparent gray transparent gray",
              boxSizing: "border-box",
            }}
          />
        </Box>

        <Box
          sx={{
            width: { xs: "100%", md: "60%" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: { xs: "80%", sm: "85%", md: "70%" } ,margin:''}}>
            <Typography variant="h4" fontSize={{xs:'22px'}} sx={{ mb: 3 }}>
              We Realize that there are reduced Wastage Stand out
            </Typography>
            {[
              "Inappropriate behavior is often laughed off...",
              "Women face higher conduct standards – especially in the workplace.",
              "That’s why it’s crucial that, as women...",
            ].map((text, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{ fontSize: "15px", fontWeight: 200, mb: 2 }}
              >
                {text}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Tour Cards Section */}
      <Box sx={{ px: 2, py: 4 }} data-aos="fade-up">
        <Box width={"80%"} margin={"auto"}>
          <Box width={"100%"} mb={'10px'}>
            <Typography variant="p">Special Offers</Typography>
          </Box>
          <Box width={"100%"} mb={'30px'}>
            <Typography variant="h5"><span style={{fontWeight:'700'}}>Top</span> Tour Packages</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",

            flexWrap: "wrap",
            justifyContent: "center",
            gap: 2,
            maxWidth: "1300px",
            mx: "auto",
          }}
        >
          {tours.slice(0, 4).map((item) => (
            <Box
              key={item._id}
              data-aos="zoom-in-up"
              sx={{
                border: "1px solid #ccc",
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
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                    height: "80px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      textAlign: "start",
                      flex: 1,
                      pr: 1,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="subtitle1" color="primary">
                    ${item.price}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    mb: 1,
                  }}
                >
                  <Rating size="small" value={item.rating} readOnly />
                  <Typography variant="body2" fontWeight={300}>
                    {item.ratingCount} Rating
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  color="gray"
                  mb={1}
                  textAlign="start"
                  sx={{ overflow: "hidden", height: "100px" }}
                >
                  {item.description}
                </Typography>
                <Typography
                  variant="body2"
                  color="blue"
                  mt={1}
                  mb={2}
                  textAlign="center"
                >
                  {item.day} <span style={{ color: "black" }}>Days</span> /{" "}
                  {item.night} <span style={{ color: "black" }}>Nights</span>
                </Typography>
                <Box textAlign="center">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 1,
                    }}
                  >
                    <LocationOnIcon fontSize="small" color="action" />
                    <Typography variant="body2">
                      {item.location.toUpperCase()}
                    </Typography>
                  </Box>
                  <Link href="/tour" underline="none">
                    <Button
                      size="small"
                      variant="contained"
                      color=""
                     sx={{
                  width: "100%",
                  color: "orangered",
                  border: "1px solid orangered",
                  borderRadius: "0px",
                  mt: 1,
                  "&:hover": {
                    color: "white",
                    background: "orangered",
                    border: "1px solid black",
                  },}}
                    >
                      Discover
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 200, 160, 0.8), rgba(0, 200, 160, 0.8)), url(${bg_1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          py: { xs: 8, md: 12 },
          px: 2,
          color: "#fff",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" fontWeight={600} mb={2}>
          Some fun facts
        </Typography>
        <Typography variant="subtitle1" mb={6}>
          More than 100,000 websites hosted
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: { xs: 3, md: 6 },
            width: "100%",
            maxWidth: "1000px",
          }}
        >
          {stats.map((item, index) => (
            <Box
              key={index}
              sx={{
                flex: "1 1 40%",
                minWidth: "150px",
                textAlign: "center",
              }}
            >
              <Typography variant="h5" fontWeight={700}>
                {item.number}
              </Typography>
              <Typography variant="subtitle2">{item.label}</Typography>
            </Box>
          ))}
        </Box>
      </Box>


      <Box sx={{ px: 2, py: 4 }} data-aos="fade-up">
        <Box width={"80%"} margin={"auto"}>
          <Box width={"100%"} mb={'10px'}>
            <Typography variant="p">Special Offers</Typography>
          </Box>
          <Box width={"100%"} mb={'30px'}>
            <Typography variant="h5"><span style={{fontWeight:'700'}}>Popular </span> Hotels & Rooms</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",

            flexWrap: "wrap",
            justifyContent: "center",
            gap: 3,
            maxWidth: "1300px",
            mx: "auto",
          }}
        >
          {hotels.slice(0, 4).map((item) => (
            <Box
              key={item._id}
              data-aos="zoom-in-up"
              sx={{
                border: "1px solid #ccc",
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
                  alt={item.name}
                  sx={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
              )}
              <Box sx={{ p: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                    height: "80px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      textAlign: "start",
                      flex: 1,
                      pr: 1,
                    }}
                  >
                    {item.name}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  color="gray"
                  mb={1}
                  textAlign="start"
                  sx={{ overflow: "hidden", height: "100px" }}
                >
                  {item.description}
                </Typography>
                <Box textAlign="center">
                  <Link href={`/hotel/${item._id}`} underline="none">
                    <Button
                      size="small"
                      variant="contained"
                      color=""
                      sx={{
                        width: "100%",
                        color: "orangered",
                        border: "1px solid orangered",
                        borderRadius: "0px",
                        mt: 1,
                        "&:hover": {
                          color: "white",
                          background: "orangered",
                          border: "1px solid black",
                        },
                      }}
                    >
                      Discover
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

     {/* Reviews Section */}
     <Box sx={{ px: 2, py: 4, backgroundColor: "#f9f9f9" }} data-aos="fade-up">
       <Box width={"80%"} margin={"auto"}>
         <Box width={"100%"} mb={'10px'}>
           <Typography variant="p">Testimonials</Typography>
         </Box>
         <Box width={"100%"} mb={'30px'}>
           <Typography variant="h5"><span style={{fontWeight:'700'}}>What Our</span> Customers Say</Typography>
         </Box>
       </Box>
       <Slider {...settings}>
         {reviews.slice(-5).map((review) => (
           <Box key={review._id} sx={{ p: 4 }}>
             <Box
               sx={{
                 p: 3,
                 backgroundColor: "white",
                 borderRadius: 2,
                 boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                 textAlign: "center",
                 maxWidth: "600px",
                 mx: "auto",
               }}
             >
               <Typography variant="h6" fontWeight={600} gutterBottom>
                 {review.fullName}
               </Typography>
               <Rating value={review.Tourdays} readOnly />
               <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                 "{review.experience}"
               </Typography>
             </Box>
           </Box>
         ))}
       </Slider>
     </Box>
   </>
 );
};

export default Sliders;
