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
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ToastModal from "./TostModal";
import BoxStyle from "./StylesModal/BoxStyle";
import { get } from "../../server/server";




const MyErrorMessage = ({ name }) => (
  <ErrorMessage
    name={name}
    render={(msg) => <div style={{ color: "red" }}>{msg}</div>} // Display the error message in red
  />
);

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  features: Yup.array()
    .of(Yup.string())
    .min(1, "At least one feature is required"), 
});



const SubscriptionModel = ({
  open,
  setOpen,
  handleClose,
  title,
  eventMessage,
  setToastOpen,
  toastOpen,
}) => {
  const theme = useTheme();

  const [features, setFeatures] = useState([]);

  const fetchFeatures = async () => {
    const { res, err } = await get("features/get?limit=200&page=1");
    if (res) {
      console.log(res);
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
                Add Subscription Plan
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
                initialValues={{
                  name: "",
                  features: [],
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  console.log(values);
                }}
              >
                {({ isValid }) => (
                  <Form>
                    <Field as={TextField} label="Name" name="name" fullWidth />
                    <MyErrorMessage name="name" />

                    <FormControl fullWidth margin="normal">
                      <InputLabel id="plan-label">Features</InputLabel>
                      <Field
                        as={Select}
                        labelId="features-label"
                        name="features"
                        label="Features"
                        multiple
                        renderValue={(selected) => selected.join(", ")}
                      >
                        {features?.map((feature) => (
                          <MenuItem key={feature?.id} value={feature?.name}>
                            {feature?.name}
                          </MenuItem>
                        ))}
                      </Field>
                    </FormControl>
                    <MyErrorMessage name="features" />
                    <div className="mt-10">
                      <Button
                        type="submit"
                        disabled={!isValid}
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
                        Add Plan
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
