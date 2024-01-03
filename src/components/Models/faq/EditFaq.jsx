import React from "react";
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
  Alert,
  useTheme,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CircularProgress } from "@material-ui/core";
import BoxStyle from "../StylesModal/BoxStyle";
import ToastModal from "../TostModal";
import { post, put } from "../../../server/server";

const SubscriptionSchema = Yup.object().shape({
  question: Yup.string().required("Required"),
  answer: Yup.string().required("Required"),
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const EditFaq = ({ open, setOpen, handleClose, fetchFAQs, data }) => {
  const [toastOpen, setToastOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const theme = useTheme();

  const handleCloseToast = () => {
    setToastOpen(false);
  };

  const body = (
    <div>
      <ToastModal
        open={toastOpen}
        onClose={handleCloseToast}
        eventMessage={"FAQs added Successfully"}
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
                Edit FAQ
              </Typography>
              <IconButton
                aria-label="delete"
                onClick={handleClose}
                sx={{ padding: "0", color: "#6C309C" }}
              >
                <CancelIcon fontSize="inherit" />
              </IconButton>
            </div>
            {error && (
              <Alert severity="error" sx={{ mb: 5 }}>
                {error}
              </Alert>
            )}
            <CardContent className="m-3">
              <Formik
                initialValues={{
                  question: data?.question || "",
                  answer: data?.answer || "",
                }}
                validationSchema={SubscriptionSchema}
                onSubmit={async (values) => {
                  setLoading(true);
                  const { res, err } = await put("/faqs/update", null, null, {
                    id: data?.id,
                    question: values.question,
                    answer: values.answer,
                  });
                  if (err) {
                    console.error(err);
                    setLoading(false);
                    setError(err?.response?.data?.message);
                  }
                  if (res) {
                    setLoading(false);
                    setError(false);
                  }
                  setToastOpen(true);
                  setTimeout(() => {
                    setOpen(false);
                    if (fetchFAQs) {
                      fetchFAQs();
                    }
                  }, 1000);
                }}
              >
                {({ errors, touched, isValid }) => (
                  <Form>
                    <div className="mb-4">
                      <Field
                        name="question"
                        as={TextField}
                        id="outlined-basic"
                        placeholder={"Add Question"}
                        variant="outlined"
                        fullWidth
                        // multiline
                        // rows={4}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "20px",
                            borderColor: "rgba(0, 0, 0, 0.04)",
                            borderWidth: "0px",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(0, 0, 0, 0.04)",
                          },
                          p: 0,
                          borderRadius: "20px",
                          backgroundColor: "rgba(0, 0, 0, 0.04)",
                        }}
                        size="small"
                      />
                      {errors.question &&
                      typeof errors.question === "string" ? (
                        <Typography
                          sx={{
                            mt: 1,
                            fontSize: "0.8rem",
                            color: "red",
                            ml: 2,
                          }}
                        >
                          {errors.question}
                        </Typography>
                      ) : null}
                    </div>
                    <div className="mb-4">
                      <Field
                        name="answer"
                        as={TextField}
                        id="outlined-basic"
                        placeholder={"Add Answer"}
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "20px",
                            borderColor: "rgba(0, 0, 0, 0.04)",
                            borderWidth: "0px",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(0, 0, 0, 0.04)",
                          },
                          p: 0,
                          borderRadius: "20px",
                          backgroundColor: "rgba(0, 0, 0, 0.04)",
                        }}
                        size="small"
                      />
                      {errors.answer && typeof errors.answer === "string" ? (
                        <Typography
                          sx={{
                            mt: 1,
                            fontSize: "0.8rem",
                            color: "red",
                            ml: 2,
                          }}
                        >
                          {errors.answer}
                        </Typography>
                      ) : null}
                    </div>

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
                        {loading ? <CircularProgress size={24} /> : "Edit FAQ"}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </CardContent>
        </Card>
      </BoxStyle>
    </div>
  );

  return (
    <div style={{ backgroundColor: "rgba(0, 0, 0, 0.16)" }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="user-detail-modal-title"
        aria-describedby="user-detail-modal-description"
        slotProps={{
          backdrop: {
            style: { opacity: 0.1, backgroundColor: "rgba(0, 0, 0, 0.5)" },
          },
        }}
        sx={{
          display: "flex", // Use flexbox for centering
          alignItems: "center", // Vertically center the modal
          justifyContent: "center", // Horizontally center the modal
          px: 2, // Apply some padding on the x-axis
          [theme.breakpoints.down("sm")]: {
            overflowY: "auto", // Add scroll on smaller screens if needed
          },
        }}
      >
        {body}
      </Modal>
    </div>
  );
};

export default EditFaq;
