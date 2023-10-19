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
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ToastModal from "./TostModal";
import { post } from "../../server/server";
import { CircularProgress } from "@material-ui/core";

const SubscriptionSchema = Yup.object().shape({
  description: Yup.string().required("Required"),
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const AddFeaturesModal = ({ open, setOpen, handleClose, fetchFeatures }) => {
  const [toastOpen, setToastOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleCloseToast = () => {
    setToastOpen(false);
  };

  const body = (
    <div style={{ backgroundColor: "rgba(0, 0, 0, 0.16)" }}>
      <ToastModal
        open={toastOpen}
        onClose={handleCloseToast}
        eventMessage={"Feature added Successfully"}
      />
      <Box style={style}>
        <Card className="sm:w-[500px] w-[80%]" sx={{ borderRadius: "30px" }}>
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
                Add Feature
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
                  description: "",
                }}
                validationSchema={SubscriptionSchema}
                onSubmit={async (values) => {
                  setLoading(true);
                  const { res, err } = await post("/features/add", null, null, {
                    description: values.description,
                  });
                  if (err) {
                    console.error(err);
                    setLoading(false);
                    setError(err?.response?.data?.message);
                  }
                  if (res) {
                    if (fetchFeatures) {
                      fetchFeatures();
                    }
                    setLoading(false);
                    setError(false);
                  }
                  setToastOpen(true);
                  setTimeout(() => {
                    setOpen(false);
                  }, 1000);
                }}
              >
                {({ errors, touched, isValid }) => (
                  <Form>
                    <div className="mb-4">
                      <Field
                        name="description"
                        as={TextField}
                        id="outlined-basic"
                        placeholder={"Add Description"}
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
                      {errors.description &&
                      typeof errors.description === "string" ? (
                        <Typography
                          sx={{
                            mt: 1,
                            fontSize: "0.8rem",
                            color: "red",
                            ml: 2,
                          }}
                        >
                          {errors.description}
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
                        {loading ? (
                          <CircularProgress size={24} />
                        ) : (
                          "Add Features"
                        )}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </CardContent>
        </Card>
      </Box>
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
      >
        {body}
      </Modal>
    </div>
  );
};

export default AddFeaturesModal;
