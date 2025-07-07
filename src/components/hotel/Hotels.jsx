import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Rating,
  Link,
} from "@mui/material";
import Header from "../layouts/Header";
import bg from "../../assets/image/slider2.jpg";
import { useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AOS from "aos";
import "aos/dist/aos.css";

import { useSelector, useDispatch } from "react-redux";
import { fetchHotels } from "../../redux/slices/hotelSlice";

const Hotels = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const hotels = useSelector((state) => state.hotels.hotels);
  const status = useSelector((state) => state.hotels.status);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchHotels());
    }
  }, [dispatch, status]);

  const handleSearch = () => {
    const lowerSearch = searchTerm.toLowerCase();
    const filtered = hotels.filter(
      (hotel) =>
        hotel.name.toLowerCase().includes(lowerSearch) ||
        hotel.fullname.toLowerCase().includes(lowerSearch)
    );
    setFilteredData(filtered);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setFilteredData([]);
  };

  const displayData = filteredData.length > 0 ? filteredData : hotels;

  const handleDiscoverClick = (hotel) => {
    navigate(`/hotel/${hotel._id}`);
  };

  if (status === "loading") {
    return <Typography textAlign="center" mt={5}>Loading hotels...</Typography>;
  }

  if (status === "failed") {
    return <Typography textAlign="center" mt={5}>Failed to load hotels.</Typography>;
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
              Hotels
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
            OUR HOTELS
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
          <Typography variant="h6">FIND HOTEL</Typography>
          <TextField
            placeholder="Hotel Name"
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

          {searchTerm && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClearFilters}
            >
              Reset Filters
            </Button>
          )}
        </Box>

        {/* Hotel Cards */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: { xs: "center", md: "flex-start" },
          }}
        >
          {displayData.length > 0 ? (
            displayData.map((item) => (
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
                    alt="Hotel"
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
            <Typography>No hotel data available.</Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Hotels;