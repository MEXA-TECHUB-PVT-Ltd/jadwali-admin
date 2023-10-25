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
  CircularProgress,
  TextField,
  Alert,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useFormik } from "formik";
import * as Yup from "yup";
import { post } from "../../../server/server";
import ToastModal from "../TostModal";
import BoxStyle from "../StylesModal/BoxStyle";
import { useTheme } from "@mui/material/styles";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const DiscountModal = ({
  open,
  setOpen,
  handleClose,
  currentUser,
  toastOpen,
  setToastOpen,
  fetchUsers,
}) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
const theme = useTheme();

  const validationSchema = Yup.object({
    discount: Yup.number()
      .required("Discount is required")
      .positive("Discount must be a positive number")
      .integer("Discount must be an integer"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      discount: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const { res, err } = await post("/users/discount", null, null, {
        user_id: currentUser && currentUser?.user_id,
        count: values.discount,
      });
      if (err) {
        console.error(err);
        setError(err.response.data.message);
        setLoading(false);
      }
      if (res) {
        console.log(res.message);
        setSuccess(res.message)
        setLoading(false);
        setError(null);
        formik.resetForm();
        if (fetchUsers) {
          fetchUsers();
        }
        setToastOpen(true);
        setTimeout(() => {
          setOpen(false);
        }, 1000);
      }
    },
  });
  const handleCloseToast = () => {
    setToastOpen(false);
  };

  const handleCloseModal = () => {
    formik.resetForm();
    setError(null);
    if (handleClose) {
      handleClose();
    }
  };
  const body = (
    <>
      <ToastModal
        open={toastOpen}
        onClose={handleCloseToast}
        eventMessage={success}
      />
      <BoxStyle>
        <Card className="sm:w-[550px] mx-5" sx={{ borderRadius: "30px" }}>
          <CardContent className="p-0" sx={{ padding: 0 }}>
            <div className="px-5 py-3 flex justify-between items-center">
              <Typography
                sx={{
                  m: 0,
                  fontSize: "20px",
                  margin: "0",
                  fontWeight: "bold",
                }}
              >
                Give Discount
              </Typography>
              <IconButton aria-label="delete" onClick={handleCloseModal}>
                <CancelIcon fontSize="inherit" />
              </IconButton>
            </div>
            <CardContent className="m-3">
              {error && (
                <Alert severity="error" sx={{ mb: 5 }}>
                  {error}
                </Alert>
              )}
              <Box
                component="form"
                onSubmit={formik.handleSubmit}
                className="flex flex-col items-center"
              >
                <TextField
                  name="discount"
                  id="outlined-basic"
                  placeholder="Enter the number of people to receive a discount"
                  variant="outlined"
                  fullWidth
                  type="number"
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
                  value={formik.values.discount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.discount && Boolean(formik.errors.discount)
                  }
                  helperText={formik.touched.discount && formik.errors.discount}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: "#6C309C",
                    borderRadius: "20px",
                    "&:hover": {
                      backgroundColor: "#6C309C",
                    },
                    mt: 5,
                  }}
                >
                  {loading ? <CircularProgress size={24} /> : "Give Discount"}
                </Button>
              </Box>
            </CardContent>
          </CardContent>
        </Card>
      </BoxStyle>
    </>
  );

  return (
    <>
      <div style={{ backgroundColor: "rgba(0, 0, 0, 0.16)", width: '100%' }}>
        <Modal
          open={open}
          onClose={handleCloseModal}
          aria-labelledby="user-detail-modal-title"
          aria-describedby="user-detail-modal-description"
          slotProps={{
            backdrop: {
              style: { opacity: 0.5, backgroundColor: "rgba(0, 0, 0, 1)" },
            },
          }}
          sx={{
            display: "flex", // Use flexbox for centering
            alignItems: "center", // Vertically center the modal
            justifyContent: "center", // Horizontally center the modal
            // px: 2, // Apply some padding on the x-axis
            [theme.breakpoints.down("sm")]: {
              overflowY: "auto", // Add scroll on smaller screens if needed
            },
            width: "100%"
          }}
        >
          {body}
        </Modal>
      </div>
    </>
  );
};

export default DiscountModal;
