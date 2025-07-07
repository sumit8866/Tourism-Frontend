import { Box, Button, Rating, Typography, TextField, InputLabel, MenuItem, Select, FormControl } from "@mui/material";
import axios from "axios";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Multiphoto = () => {
  const key = "Ofokc8bYPo2MB7Ll";
  
  const [previews, setPreviews] = useState([]);
  const [dayCount, setDayCount] = useState(0);

  const initialValues = {
    title: "", price: "", rating: 0, ratingCount: 0,
    description: "", day: "", night: "", location: "", image: [],
    day1: "", day2: "", day3: "", day4: "", day5: "",
    day1_description: "", day2_description: "", day3_description: "",
    day4_description: "", day5_description: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    price: Yup.number().required("Required"),
    rating: Yup.number().min(0).max(5),
    ratingCount: Yup.number().min(0),
    description: Yup.string().required("Required"),
    day: Yup.number().required("Required"),
    night: Yup.number().required("Required"),
    location: Yup.string().required("Required"),
    image: Yup.array().min(1, "At least one image is required"),
  });



  const handleSubmit = (values, { resetForm }) => {
  const formData = new FormData();

  
  formData.append("title", values.title);
  formData.append("price", values.price);
  formData.append("rating", values.rating);
  formData.append("ratingCount", values.ratingCount);
  formData.append("description", values.description);
  formData.append("day", values.day);
  formData.append("night", values.night);
  formData.append("location", values.location);

  
  formData.append("day1", values.day1);
  formData.append("day2", values.day2);
  formData.append("day3", values.day3);
  formData.append("day4", values.day4);
  formData.append("day5", values.day5);

  formData.append("day1_description", values.day1_description);
  formData.append("day2_description", values.day2_description);
  formData.append("day3_description", values.day3_description);
  formData.append("day4_description", values.day4_description);
  formData.append("day5_description", values.day5_description);

  
  if (Array.isArray(values.image)) {
    values.image.forEach((file) => {
      formData.append("image", file);
    });
  }

  
  axios
    .post("https://generateapi.onrender.com/api/detailstour", formData, {
      headers: {
        Authorization: "Ofokc8bYPo2MB7Ll",
        "Content-Type": "multipart/form-data",
      },
    })
    .then(() => {
      resetForm();
      setPreviews([]);
      setDayCount(0);
      alert('Tour Added')
    })
    .catch((error) => {
      console.error("Upload error:", error.response?.status, error.response?.data);
    });
};

  return (
    <Box sx={{ px: 2 }}>
      <Typography variant="h4" mb={3}>
        Upload Tour
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form encType="multipart/form-data">
            <Box display="flex" flexDirection="column" gap={2} maxWidth={600}>
              <Field as={TextField} name="title" label="Title" fullWidth helperText={<ErrorMessage name="title" />} />
              <Field as={TextField} name="price" label="Price" type="number" fullWidth helperText={<ErrorMessage name="price" />} />
              <Box display="flex" alignItems="center" gap={2}>
                <Typography>Rating</Typography>
                <Field name="rating">
                  {({ field }) => (
                    <Rating
                      name="rating"
                      value={Number(field.value)}
                      onChange={(_, value) => setFieldValue("rating", value)}
                    />
                  )}
                </Field>
                <Field as={TextField} name="ratingCount" label="Rating Count" type="number" helperText={<ErrorMessage name="ratingCount" />} />
              </Box>
              <Field as={TextField} name="description" label="Description" multiline rows={4} fullWidth helperText={<ErrorMessage name="description" />} />
              <Field as={TextField} name="location" label="Location" fullWidth helperText={<ErrorMessage name="location" />} />
              <Box display="flex" gap={2}>
                <Field as={TextField} name="day" label="Days" type="number" onChange={(e) => {
                  const value = e.target.value;
                  setFieldValue("day", value);
                  setDayCount(Number(value));
                }} />
                <Field as={TextField} name="night" label="Nights" type="number" />
              </Box>

              {[...Array(dayCount)].map((_, i) => (
                <>
                  <Field as={TextField} name={`day${i + 1}`} label={`Day ${i + 1} Title`} fullWidth />
                  <Field as={TextField} name={`day${i + 1}_description`} label={`Day ${i + 1} Description`} multiline rows={3} fullWidth />
                </>
              ))}

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
                    const previewsArray = files.map((file) => URL.createObjectURL(file));
                    setPreviews(previewsArray);
                  }}
                />
              </Button>
              {previews.length > 0 && (
                <Box display="flex" gap={2} flexWrap="wrap">
                  {previews.map((src, i) => (
                    <img key={i} src={src} alt={`preview-${i}`} width={100} height={100} style={{ objectFit: "cover" }} />
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


    </Box>
  );
};

export default Multiphoto;
