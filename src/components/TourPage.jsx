import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "aos";
import {
  Box,
  Typography,
  CircularProgress,
  Container,
  Divider,
  Button,
  TextField,
  Paper,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Header from "./Header";
import Slider from "react-slick";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Accommodation from "../image/five.png";
import Transfer from "../image/airport.png";
import Meals from "../image/healthy-meal.png";
import Sightseeing from "../image/binocular.png";
import { Field, Form, Formik } from "formik";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const TourPage = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = String(today.getFullYear());

  var hours = String(today.getHours());
  var min = String(today.getMinutes());
  var seconds = String(today.getSeconds());
  today = `${dd}/${mm}/${yyyy} || ${hours}:${min}:${seconds}`;

  const [init, setinit] = useState({
    fullName: "",
    experience: "",
    date: `${today}`,
    Tourdays: "",
    Email: "",
    ContectNumber: "",
  });
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [review, setreview] = useState([]);
  const tourkey = "Ofokc8bYPo2MB7Ll";
  const keyrewview = "hwOMaWc5inHk1x9M";

  useEffect(() => {
    axios
      .get("https://generateapi.onrender.com/api/detailstour", {
        headers: { Authorization: tourkey },
      })
      .then((res) => {
        const found = res.data.Data.find((t) => t._id === id);
        setTour(found);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleSubmit = (values, { resetform }) => {
    axios
      .post("https://generateapi.onrender.com/api/review", values, {
        headers: {
          Authorization: keyrewview,
        },
      })
      .then((res) => {
        console.log(res.data.Data);
        showdata();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deletedata = (id) => {
    console.log("hello");

    axios
      .delete(`https://generateapi.onrender.com/api/review/${id}`, {
        headers: {
          Authorization: keyrewview,
        },
      })
      .then((res) => {
        console.log("ok");
        showdata();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showdata = () => {
    axios
      .get("https://generateapi.onrender.com/api/review", {
        headers: {
          Authorization: keyrewview,
        },
      })
      .then((res) => {
        console.log(res.data.Data);
        setreview(res.data.Data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    showdata();
  }, []);

  if (!tour)
    return <CircularProgress sx={{ mt: 10, mx: "auto", display: "block" }} />;

  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
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
  };

  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
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
  };

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

  return (
    <>
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
          {tour.image.map((slide) => (
            <Box
              sx={{
                position: "relative",
                height: { xs: "100dvh", md: "100vh" },
                width: "100%",
                backgroundImage: `url(${slide})`,
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
              >
                <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 800,
                      mb: 2,
                      fontSize: { xs: "2.5rem", sm: "3rem", md: "4rem" },
                    }}
                  >
                    {tour.location.toUpperCase()}
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
                </Box>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>

      <Box sx={{ py: 6 }} margin={"auto"} width={"90%"}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {tour.title}
        </Typography>

        <Typography sx={{ color: "orangered", fontWeight: 500, mb: 3 }}>
          {tour.night} Nights - {tour.day} Days
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Inclusions
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            maxWidth: 600,
            mt: 3,
          }}
        >
          {[
            { icon: Accommodation, label: "Accommodation" },
            { icon: Transfer, label: "Transfer" },
            { icon: Meals, label: "Meals" },
            { icon: Sightseeing, label: "Sightseeing" },
          ].map((item, i) => (
            <Box key={i} sx={{ textAlign: "center" }}>
              <img
                src={item.icon}
                alt={item.label}
                style={{ height: 50, marginBottom: 8 }}
              />
              <Typography color="gray">{item.label}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        width={"90%"}
        margin={"auto"}
        display={"flex"}
        flexDirection={{ xs: "column", md: "row" }}
      >
        <Box width={{ xs: "100%", md: "70%" }} mx={{ xs: "0px", md: "10px" }}>
          <Box
            padding={1}
            fontWeight={300}
            color={"gray"}
            backgroundColor="#fef9f4"
            border={"1px solid orangered"}
            mb={2}
          >
            {tour.description}
          </Box>
          <Box
            padding={2}
            mb={3}
            fontWeight={300}
            color={"gray"}
            backgroundColor="#fef9f4"
            border={"1px solid orangered"}
          >
            {[1, 2, 3, 4, 5].map((day) => {
              const title = tour[`day${day}`];
              const description = tour[`day${day}_description`];

              if (title === " " && description === " ") return "";

              return (
                <Box key={day} sx={{ mt: 3 }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    color="orangered"
                  >
                    Day {day}
                  </Typography>

                  {title && (
                    <Typography
                      variant="subtitle2"
                      fontWeight="bold"
                      sx={{ mt: 0.5 }}
                    >
                      {title}
                    </Typography>
                  )}

                  {/* Show tags and icons only for Day 1 */}
                  {day === 1 && (
                    <>
                      {/* Icons */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 3,
                          mt: 1,
                        }}
                      >
                        {[
                          {
                            name: "Breakfast",
                            icon: Meals,
                          },
                          {
                            name: "Transfers",
                            icon: Transfer,
                          },
                          {
                            name: "Stay Included",
                            icon: Accommodation,
                          },
                        ].map((item, idx) => (
                          <Box
                            key={idx}
                            sx={{ textAlign: "center", fontSize: "12px" }}
                          >
                            <Box
                              sx={{
                                width: 30,
                                height: 30,
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                mb: 0.5,
                              }}
                            >
                              <img src={item.icon} alt="" width={"100%"} />
                            </Box>
                            <Typography fontSize={"14px"}>
                              {item.name}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </>
                  )}

                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      flexWrap: "wrap",
                      my: 1,
                    }}
                  >
                    {[
                      "Arrival Transfer",
                      "Sightseeing tour",
                      "Lunch",
                      "Dinner",
                    ].map((tag, index) => (
                      <Box
                        key={index}
                        sx={{
                          fontSize: "12px",
                          px: 1.2,
                          py: 0.5,

                          borderRadius: "20px",
                          color: "#555",
                          border: "1px solid #ddd",
                        }}
                      >
                        {tag}
                      </Box>
                    ))}
                  </Box>
                  {/* Description */}
                  {description && (
                    <Typography
                      sx={{
                        mt: 1,
                        color: "#555",
                        fontSize: "15px",
                        lineHeight: 1.7,
                      }}
                    >
                      {description}
                    </Typography>
                  )}

                  <Divider sx={{ mt: 2 }} />
                </Box>
              );
            })}
          </Box>
        </Box>
        <Box
          width={{ xs: "95%", md: "30%" }}
          backgroundColor="#fef9f4"
          border={"1px solid orangered"}
          mx={{ xs: "0px", md: "10px" }}
          my={{ xs: "20px", md: "0px" }}
          sx={{ height: "fit-content" }}
          p={1}
        >
          <Formik
            enableReinitialize
            initialValues={init}
            onSubmit={handleSubmit}
          >
            <Form>
              <Typography
                color="orangered"
                variant="div"
                fontSize={"14px"}
                px={"15px"}
                fontWeight={700}
                border={"1px solid orangered"}
                textAlign={"start"}
              >
                {" "}
                Your Full Name
              </Typography>
              <Field
                as={TextField}
                fullWidth
                name="fullName"
                size="small"
                type="text"
                sx={{ mb: 2, mt: "5px" }}
              ></Field>
              <Typography
                color="orangered"
                variant="div"
                fontSize={"14px"}
                px={"15px"}
                fontWeight={700}
                border={"1px solid orangered"}
                textAlign={"start"}
              >
                {" "}
                Tour Experience
              </Typography>

              <Field
                as={TextField}
                fullWidth
                name="experience"
                size="small"
                type="text"
                multiline
                rows={3}
                sx={{ mb: 2, mt: "5px" }}
              ></Field>

              <Typography
                color="orangered"
                variant="div"
                fontSize={"14px"}
                px={"15px"} 
                fontWeight={700}
                border={"1px solid orangered"}
                textAlign={"start"}
                mb={1}
              >
                {" "}
                Rating 
              </Typography>

              <Field
                as={TextField}
                name="Tourdays"
                label='Rate in 1 to 5'
                type="number"
                fullWidth
                size="small"
                sx={{ mb: 2, mt: "5px" }}
              ></Field>

              <Typography
                color="orangered"
                variant="div"
                fontSize={"14px"}
                px={"15px"}
                fontWeight={700}
                border={"1px solid orangered"}
                textAlign={"start"}
              >
                {" "}
                Your Email
              </Typography>

              <Field
                as={TextField}
                name="Email"
                type="email"
                fullWidth
                size="small"
                sx={{ mb: 2, mt: "5px" }}
              ></Field>
              <Typography
                color="orangered"
                variant="div"
                fontSize={"14px"}
                px={"15px"}
                fontWeight={700}
                border={"1px solid orangered"}
                textAlign={"start"}
              >
                {" "}
                Contect Number
              </Typography>

              <Field
                as={TextField}
                name="ContectNumber"
                type="number"
                fullWidth
                size="small"
                sx={{ mb: 2, mt: "5px" }}
              ></Field>

              <Button
                type="submit"
                fullWidth
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
                Submit
              </Button>
            </Form>
          </Formik>

          <Box
            backgroundColor="#fef9f4"
            mx={{ xs: "0px", md: "10px" }}
            my={{ xs: "20px", md: "0px" }}
            sx={{ height: "fit-content" }}
            p={0}
          >
            {review.slice(-1).map((review, index) => (
              <>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    my: 2,
                    borderLeft: "6px solid orangered",
                    backgroundColor: "#fffdf9",
                    width: { xs: "90%", md: "100%" },
                    mx: "auto",
                  }}
                >
                  <Box width={"100%"} display={"flex"} justifyContent={"end"} marginBottom={'-40px'}>
                    <Button onClick={() => deletedata(review._id)}>
                      <DeleteForeverIcon />
                    </Button>
                  </Box>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    color="orangered"
                    gutterBottom
                  >
                    {review.fullName}
                  </Typography>

                  <Typography fontStyle="italic" color="gray" gutterBottom>
                    {review.date}
                  </Typography>

                  <Box mb={1}>
                    <Typography
                      sx={{
                        wordBreak: "break-word", 
                        whiteSpace: "pre-wrap", 
                        overflowWrap: "break-word", 
                        maxWidth: "100%",   
                      }}
                    >
                      {review.experience}
                    </Typography>
                  </Box>

                  <Box display="flex" flexWrap="wrap" flexDirection={{xs:'column',md:'row'}} gap={2}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <EmailIcon fontSize="small" color="action" />
                      <Typography fontSize="14px">{review.Email}</Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                      <PhoneIcon fontSize="small" color="action" />
                      <Typography fontSize="14px">
                        {review.ContectNumber}
                      </Typography>
                    </Box>

                    <Box >
                      <Typography variant="caption" color="textSecondary">
                        <Rating size="small" value={review.Tourdays} readOnly />
                      </Typography>
                    </Box>
                  </Box>
                  <Link to='/'>
                   <Button
                type="submit"
                fullWidth
                sx={{
                  width: "50%",
                  color: "green",
                  border: "1px solid green",
                  borderRadius: "0px",
                  mt: 1,
                  "&:hover": {
                    color: "white",
                    background: "green",
                    border: "1px solid white",
                  },
                }}
              >
                View All
              </Button></Link>
                </Paper>
              </>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default TourPage;
