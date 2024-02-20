import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import {
  CardContent,
  Typography,
  IconButton,
  Avatar,
  Button,
  Modal,
  TextField,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ToastModal from "./TostModal";
import BoxStyle from "./StylesModal/BoxStyle";
import { get, post, put } from "../../server/server";

const MyErrorMessage = ({ name }) => (
  <ErrorMessage
    name={name}
    render={(msg) => <div style={{ color: "red" }}>{msg}</div>} // Display the error message in red
  />
);

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  price: Yup.number().required("price is required"),
  features: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.number().required(),
        name: Yup.string().required(),
      })
    )
    .min(1, "At least one feature is required"),
});

const SubscriptionModel = ({
  open,
  setOpen,
  handleClose,
  modalData,
  setToastOpen,
  toastOpen,
  fetchData,
}) => {
  const theme = useTheme();

  const [features, setFeatures] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchFeatures = async () => {
    const { res, err } = await get("features/get?limit=200&page=1");
    if (res) {
      // console.log(res);
      setFeatures(res?.results);
    }
    if (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  const handleCloseToast = () => {
    setToastOpen(false);
  };

  // Transform modalData.features to the required format
  const transformedFeatures = modalData?.features
    ?.filter((d) => d.isSelected)
    ?.map((feature) => ({
      id: feature.id,
      name: feature.name,
    }));

  // Set initial values based on modalData
  const initialValues = {
    name: modalData?.name || "",
    price: modalData?.price || "",
    features: transformedFeatures || [],
  };

  const body = (
    <>
      <ToastModal
        open={toastOpen}
        onClose={handleCloseToast}
        eventMessage="Add Plan Successfully"
      />
      <BoxStyle>
        <Card className="sm:w-[550px] mx-5" sx={{ borderRadius: "30px" }}>
          <CardContent className="p-0" sx={{ padding: 0 }}>
            <div className="mb-12 bg-[#C7AEDB] px-5 py-3 flex justify-between items-center">
              <Typography
                sx={{
                  m: 0,
                  fontSize: "20px",
                  color: "#6C309C",
                  margin: "0",
                  fontWeight: "medium",
                }}
              >
                Edit Subscription Plan
              </Typography>
              <IconButton
                aria-label="delete"
                onClick={handleClose}
                sx={{ padding: "0", color: "#6C309C" }}
              >
                <CancelIcon fontSize="inherit" />
              </IconButton>
            </div>
            <CardContent className="m-3">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  const feature_ids = values.features.map(
                    (feature) => feature.id
                  );
                  setLoading(true);

                  const { res, err } = await put(
                    "/subscription_plan/update",
                    null,
                    null,
                    {
                      id: modalData?.id,
                      name: values.name,
                      price: values.price,
                      feature_ids,
                    }
                  );

                  if (res) {
                    console.log(res);
                    setOpen(false);
                    setLoading(false);
                    if (fetchData) {
                      fetchData();
                    }
                  }

                  if (err) {
                    console.log(err);
                    setLoading(false);
                  }
                }}
              >
                {({ isValid, values, setFieldValue }) => (
                  <Form>
                    <Field as={TextField} label="Name" name="name" fullWidth />
                    <MyErrorMessage name="name" />
                    <Field
                      as={TextField}
                      label="Price"
                      name="price"
                      fullWidth
                      sx={{ marginTop: "10px" }}
                    />
                    <MyErrorMessage name="price" />

                    <FormControl fullWidth margin="normal">
                      <InputLabel id="features-label">Features</InputLabel>
                      <Select
                        labelId="features-label"
                        name="features"
                        multiple
                        value={values.features}
                        onChange={(event) => {
                          const clickedFeature =
                            event.target.value[event.target.value.length - 1];
                          const isFeatureSelected = values.features.some(
                            (feature) => feature.id === clickedFeature.id
                          );

                          let newFeatures;
                          if (isFeatureSelected) {
                            newFeatures = values.features.filter(
                              (feature) => feature.id !== clickedFeature.id
                            );
                          } else {
                            newFeatures = [...values.features, clickedFeature];
                          }

                          setFieldValue("features", newFeatures);
                        }}
                        renderValue={(selected) => (
                          <Box display="flex" flexWrap="wrap" gap={0.5}>
                            {selected.map((item) => (
                              <Chip key={item.id} label={item.name} />
                            ))}
                          </Box>
                        )}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 224, // You can adjust this value as needed
                            },
                          },
                        }}
                      >
                        {features?.map((feature) => (
                          <MenuItem
                            key={feature.id}
                            value={{ id: feature.id, name: feature.name }}
                            // Use the selected prop to determine if the item is selected
                            selected={values.features.some(
                              (selectedFeature) =>
                                selectedFeature.id === feature.id
                            )}
                          >
                            {feature.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <MyErrorMessage name="features" />
                    <div className="mt-10">
                      <Button
                        type="submit"
                        disabled={loading}
                        fullWidth
                        sx={{
                          backgroundColor: "#6C309C",
                          borderRadius: "20px",
                          "&:hover": {
                            backgroundColor: "#6C309C",
                          },
                          color: "#fff",
                        }}
                      >
                        Edit Plan
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </CardContent>
        </Card>
      </BoxStyle>
    </>
  );

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="user-detail-modal-title"
      aria-describedby="user-detail-modal-description"
      // slotProps={{
      //     backdrop: { style: { opacity: 0.1, backgroundColor: 'rgba(0, 0, 0, 3)' } }
      // }}
      sx={{
        display: "flex", // Use flexbox for centering
        alignItems: "center", // Vertically center the modal
        justifyContent: "center", // Horizontally center the modal// Apply some padding on the x-axis
        [theme.breakpoints.down("sm")]: {
          overflowY: "auto", // Add scroll on smaller screens if needed
        },
      }}
    >
      {body}
    </Modal>
  );
};

export default SubscriptionModel;
