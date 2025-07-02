import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Rating,
  Link,
} from "@mui/material";
import Header from "./Header";
import bg from "../image/slider2.jpg";
import { useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AOS from "aos";
import "aos/dist/aos.css";

import { useSelector, useDispatch } from "react-redux";
import { fetchTours } from "../redux/slices/tourSlice";

const Tour = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tours = useSelector((state) => state.tours.tours);
  const status = useSelector((state) => state.tours.status);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTours());
    }
  }, [dispatch, status]);

  const handleSearch = () => {
    const lowerSearch = searchTerm.toLowerCase();
    const filtered = tours.filter(
      (tour) =>
        tour.title.toLowerCase().includes(lowerSearch) ||
        tour.location.toLowerCase().includes(lowerSearch)
    );
    setFilteredData(filtered);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedRating(null);
    setFilteredData([]);
  };

  const displayData = filteredData.length > 0 ? filteredData : tours;
  const finalData = selectedRating
    ? displayData.filter((tour) => tour.rating === selectedRating)
    : displayData;

  const handleDiscoverClick = (tour) => {
    navigate(`/tour/${tour._id}`, { state: { tour } });
  };

  if (status === "loading") {
    return <Typography textAlign="center" mt={5}>Loading tours...</Typography>;
  }

  if (status === "failed") {
    return <Typography textAlign="center" mt={5}>Failed to load tours.</Typography>;
  }

  return (
    <>
      <Box sx={{ position: "fixed", top: 0, left: 0, zIndex: 999 }}>
        <Header />
      </Box>

      <Box
        sx={{
          position: "relative",
          height: { xs: "100dvh", md: "100svh" },
          width: "100%",
          backgroundImage: `url(${bg})`,
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
          data-aos="fade-down"
        >
          <Box>
            <Link href="Home" sx={{ textDecoration: "none", color: "gray" }}>
              Home / &nbsp;
            </Link>
            <Typography variant="p" color="darkgray">
              Tour
            </Typography>
          </Box>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              mt: 2,
              fontSize: { xs: "2.5rem", sm: "3rem", md: "4rem" },
            }}
          >
            DESTINATION
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          flexWrap: "wrap",
          padding: 4,
          gap: 3,
        }}
      >
        {/* Filter Sidebar */}
        <Box
          sx={{
            flex: { xs: "1 1 100%", md: "0 0 250px" },
            mr: { md: 4 },
            mb: { xs: 4, md: 0 },
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
          data-aos="fade-right"
        >
          <Typography variant="h6">FIND CITY</Typography>
          <TextField
            placeholder="Destination, City"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            variant="contained"
            sx={{ bgcolor: "tomato" }}
            onClick={handleSearch}
          >
            Search
          </Button>

          <Box mt={4}>
            <Typography variant="h6" mb={1}>
              STAR RATING
            </Typography>
            {[5, 4, 3, 2, 1].map((star) => (
              <Box
                key={star}
                display="flex"
                alignItems="center"
                mb={1}
                sx={{ cursor: "pointer" }}
                onClick={() => setSelectedRating(star)}
              >
                <Rating value={star} readOnly size="small" />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  ({star} Stars)
                </Typography>
              </Box>
            ))}
            {selectedRating && (
              <Button
                size="small"
                onClick={() => setSelectedRating(null)}
                sx={{ mt: 1, textTransform: "none" }}
              >
                Clear Rating Filter
              </Button>
            )}
          </Box>

          {(searchTerm || selectedRating) && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClearFilters}
            >
              Reset Filters
            </Button>
          )}
        </Box>

        {/* Tour Cards */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: { xs: "center", md: "flex-start" },
          }}
        >
          {finalData.length > 0 ? (
            finalData.map((item) => (
              <Box
                key={item._id}
                data-aos="zoom-in"
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  maxWidth: "280px",
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                  m: 1,
                  flex: "1 1 250px",
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
                    mb={1}
                    textAlign="start"
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
                    <Button
                      color="success"
                      size="small"
                      sx={{ cursor: "pointer", px: 5, py: 1 }}
                      onClick={() => handleDiscoverClick(item)}
                    >
                      More Details
                    </Button>
                  </Box>
                </Box>
              </Box>
            ))
          ) : (
            <Typography>No tour data available.</Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Tour;
