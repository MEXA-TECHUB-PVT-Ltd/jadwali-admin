import React, { useState, useRef } from "react";
import FormLayout from "../../components/Form/Layout";
import CardLayout from "../../components/Card/CardLayout";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Alert, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import { post } from "../../server/server";

const VerificationCode = () => {
  const [values, setValues] = useState(["", "", "", ""]);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const inputRefs = useRef([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  // Function to check if all inputs are filled
  const isAllInputsFilled = () => {
    return values.every((val) => val !== "");
  };

  const handleChange = (e, index) => {
    const val = e.target.value;
    if (/^[0-9]$/.test(val) || val === "") {
      const newValues = [...values];
      newValues[index] = val;
      setValues(newValues);
      if (val !== "") {
        focusNextInput(index);
      }
    }
  };

  const focusNextInput = (index) => {
    if (index < inputRefs.current.length - 1) {
      const nextInput = inputRefs.current[index + 1];
      nextInput && nextInput.focus();
    }
  };

  // Handle backspace key press
  const handleBackspace = (index, e) => {
    if (e.key === "Backspace" && values[index] === "") {
      focusPrevInput(index);
    }
  };

  const focusPrevInput = (index) => {
    if (index > 0) {
      const prevInput = inputRefs.current[index - 1];
      prevInput && prevInput.focus();
    }
  };

  const handleVerification = async () => {
    const otp = values.join("");
    const { res, err } = await post("/users/verify", null, null, {
      email: email,
      otp: otp,
    });
    if (err) {
      console.error(err);
      setError(err?.response?.data?.message);
      setLoading(false);
    }
    if (res) {
      setLoading(false);
        setError("");
        window.location = `/auth/reset-password?email=${email}`;
    }
  };

  return (
    <FormLayout link="/auth/forgot-password">
      <CardLayout
        title="JADWALI"
        subTitle="Verification"
        description="Enter code that you received on example@gmail.com"
      >
        {error && (
          <Alert severity="error" sx={{ mb: 5 }}>
            {error}
          </Alert>
        )}
        <Grid container spacing={2} justifyContent="center" className="mb-12">
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <Grid item key={index}>
                <TextField
                  value={values[index]}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleBackspace(index, e)}
                  variant="outlined"
                  type="number"
                  inputRef={(ref) => (inputRefs.current[index] = ref)}
                  InputProps={{
                    inputProps: {
                      min: 0,
                      max: 9,
                      pattern: "[0-9]{1}",
                      style: { textAlign: "center", width: "2em" },
                    },
                  }}
                  sx={{
                    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                      {
                        "-webkit-appearance": "none",
                        margin: 0,
                      },
                    "& input[type=number]": {
                      "-moz-appearance": "textfield",
                    },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "20px",
                      borderColor: "rgba(0, 0, 0, 0.04)",
                      borderWidth: "0px",
                    },
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                    borderRadius: "20px",
                  }}
                />
              </Grid>
            ))}
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: "#6C309C",
            borderRadius: "20px",
            "&:hover": {
              backgroundColor: "#6C309C",
            },
          }}
          disabled={!isAllInputsFilled()}
          onClick={handleVerification}
        >
          {loading ? <CircularProgress size={24} /> : "Verify"}
        </Button>
      </CardLayout>
    </FormLayout>
  );
};

export default VerificationCode;
