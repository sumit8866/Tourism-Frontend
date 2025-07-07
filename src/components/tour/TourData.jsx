import { Box, Button, Typography, Rating, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Multiphoto = () => {
  const key = "Ofokc8bYPo2MB7Ll"; // Your API key
  const [Tourdata, setTourData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getdata = () => {
    axios
      .get("https://generateapi.onrender.com/api/detailstour", {
        headers: { Authorization: key },
      })
      .then((res) => setTourData(res.data.Data))
      .catch((err) => console.error("Fetch error:", err));
  };

  useEffect(() => {
    getdata();
  }, []);

  const deleteData = (id) => {
    axios
      .delete(`https://generateapi.onrender.com/api/detailstour/${id}`, {
        headers: { Authorization: key },
      })
      .then(() => getdata())
      .catch((error) => console.error("Delete error:", error));
  };

  const filteredTours = Tourdata.filter((item) =>
    `${item.title} ${item.location}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ px: 2 }}>
      <Typography variant="h4" mb={3}>
        Tour List
      </Typography>

      {/* Search Field */}
      <TextField
        label="Search by title or location"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Box display="flex" flexWrap="wrap" gap={2}>
        {filteredTours.length > 0 ? (
          filteredTours.map((item) => (
            <Box
              key={item._id}
              p={2}
              border="1px solid #ccc"
              borderRadius={2}
              width={250}
            >
              {item.image?.[0] && (
                <img
                  src={item.image[0]}
                  alt="Tour"
                  width="100%"
                  height="180px"
                  style={{ objectFit: "cover", borderRadius: 4 }}
                />
              )}
              <Typography variant="h6" mt={1}>
                {item.title}
              </Typography>
              <Typography>
                <LocationOnIcon fontSize="small" /> {item.location}
              </Typography>
              <Typography>$ {item.price}</Typography>
              <Rating value={item.rating} readOnly />

              <Button
                onClick={() => deleteData(item._id)}
                variant="outlined"
                color="error"
                fullWidth
                sx={{ mt: 1 }}
              >
                Delete
              </Button>
            </Box>
          ))
        ) : (
          <Typography>No tours found.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Multiphoto;
