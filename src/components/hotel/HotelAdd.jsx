import {
  Box,
  Button,
  Typography,
  TextField
} from "@mui/material";
import axios from "axios";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";

const HotelUploader = () => {
  const key = "dvRW0eh1JNMQRsYC";
  const [hotelData, setHotelData] = useState([]);
  const [previews, setPreviews] = useState([]);

  const initialValues = {
    name: "",
    fullname: "",
    description: "",
    accommodation: "",
    hotel_policies: "",
    image: [],
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    fullname: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    accommodation: Yup.string().required("Required"),
    hotel_policies: Yup.string().required("Required"),
    image: Yup.array().min(1, "At least one image is required"),
  });

  const getdata = () => {
    axios
      .get("https://generateapi.onrender.com/api/hotels", {
        headers: { Authorization: key },
      })
      .then((res) => setHotelData(res.data.Data))
      .catch((err) => console.error("Fetch error:", err));
  };

  useEffect(() => {
    getdata();
  }, []);

  const handleSubmit = (values, { resetForm }) => {
    const formData = new FormData();
    Object.keys(values).forEach((k) => {
      if (Array.isArray(values[k])) {
        values[k].forEach((file) => formData.append("image", file));
      } else {
        formData.append(k, values[k]);
      }
    });

    axios
      .post("https://generateapi.onrender.com/api/hotels", formData, {
        headers: {
          Authorization: key,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        resetForm();
        setPreviews([]);
        getdata();
      })
      .catch((error) => console.error("Upload error:", error));
  };

  const deleteData = (id) => {
    axios
      .delete(`https://generateapi.onrender.com/api/hotels/${id}`, {
        headers: { Authorization: key },
      })
      .then(() => getdata())
      .catch((error) => console.error("Delete error:", error));
  };

  return (
    <Box sx={{ px: 2 }}>
      <Typography variant="h4" mb={3}>
        Upload Hotel
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form encType="multipart/form-data">
            <Box display="flex" flexDirection="column" gap={2} maxWidth={600}>
              <Field
                as={TextField}
                name="name"
                label="Short Name"
                fullWidth
                helperText={<ErrorMessage name="name" />}
              />
              <Field
                as={TextField}
                name="fullname"
                label="Full Name"
                fullWidth
                helperText={<ErrorMessage name="fullname" />}
              />
              <Field
                as={TextField}
                name="description"
                label="Description"
                multiline
                rows={3}
                fullWidth
                helperText={<ErrorMessage name="description" />}
              />
              <Field
                as={TextField}
                name="accommodation"
                label="Accommodation Details"
                multiline
                rows={3}
                fullWidth
                helperText={<ErrorMessage name="accommodation" />}
              />
              <Field
                as={TextField}
                name="hotel_policies"
                label="Hotel Policies"
                multiline
                rows={3}
                fullWidth
                helperText={<ErrorMessage name="hotel_policies" />}
              />

              <Button variant="contained" component="label">
                Upload Images
                <input
                  type="file"
                  name="image"
                  hidden
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    setFieldValue("image", files);
                    const previewsArray = files.map((file) =>
                      URL.createObjectURL(file)
                    );
                    setPreviews(previewsArray);
                  }}
                />
              </Button>

              {previews.length > 0 && (
                <Box display="flex" gap={2} flexWrap="wrap">
                  {previews.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`preview-${i}`}
                      width={100}
                      height={100}
                      style={{ objectFit: "cover" }}
                    />
                  ))}
                </Box>
              )}

              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Box>
          </Form>
        )}
      </Formik>

      <Typography variant="h5" mt={5} mb={2}>
        Hotel List
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={3}>
        {hotelData.map((item) => (
          <Box
            key={item._id}
            p={2}
            border="1px solid #ccc"
            borderRadius={2}
            width={250}
          >
            {item.image?.length > 0 && (
              <img
                src={item.image[0]}
                alt="Hotel"
                width="100%"
                height="180px"
                style={{ objectFit: "cover", borderRadius: 4 }}
              />
            )}
            <Typography variant="h6" mt={1}>
              {item.name}
            </Typography>
            <Typography variant="body2">{item.fullname}</Typography>
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
        ))}
      </Box>
    </Box>
  );
};

export default HotelUploader;
