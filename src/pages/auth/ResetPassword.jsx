import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Typography, TextField, Button, Alert } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormLayout from '../../components/Form/Layout';
import CardLayout from '../../components/Card/CardLayout';
import ToastModal from '../../components/Models/TostModal';
import { useLocation, useNavigate } from 'react-router-dom';
import { put } from '../../server/server';
import { CircularProgress } from '@material-ui/core';


const validationSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, "Password is too short.")
        .required('Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), ''], 'Passwords must match')
        .required('Required'),
});

const Forgot = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [toastOpen, setToastOpen] = React.useState(false);
      const [error, setError] = React.useState("");
      const [loading, setLoading] = React.useState(false);


      const location = useLocation();
      const queryParams = new URLSearchParams(location.search);
      const email = queryParams.get("email");

    const navigate = useNavigate();

    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
    };
    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        setLoading(true);
        const { res, err } = await put("/users/resetPassword", null, null, {
          email: email,
          newPassword: values.confirmPassword,
        });
        if (err) {
            console.error(err);
            setError(err?.response?.data?.message);
            setLoading(false);
        }
        if (res) {
            console.log(res);
            setToastOpen(true);
            setError('')
            setLoading(false);
            setTimeout(() => {
                navigate('/auth/sign-in')
            }, 2000)
        }
    };

    const handleCloseToast = () => {
        setToastOpen(false);  
    };


    return (
      <FormLayout link="/auth/sign-in">
        <ToastModal
          open={toastOpen}
          onClose={handleCloseToast}
          eventMessage="Password Reset Successfully!"
        />
        <CardLayout
          title="JADWALI"
          subTitle="Reset Password"
          description="Create a strong password"
        >
          {error && (
            <Alert severity="error" sx={{ mb: 5 }}>
              {error}
            </Alert>
          )}
          <Formik
            initialValues={{ password: "", confirmPassword: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-5">
                  <Field name="password">
                    {({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-basic"
                        placeholder={"Enter your password"}
                        variant="outlined"
                        fullWidth
                        type={showPassword ? "text" : "password"}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "20px",
                            borderColor: "rgba(0, 0, 0, 0.04)",
                            borderWidth: "0px",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(0, 0, 0, 0.04)",
                          },
                          // mb: 2,
                          p: 0,
                          borderRadius: "20px",
                          backgroundColor: "rgba(0, 0, 0, 0.04)",
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockOutlinedIcon
                                sx={{
                                  color: "rgba(0, 0, 0, 0.4)",
                                  fontSize: "16px",
                                }}
                              />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                edge="end"
                                onClick={handleTogglePassword}
                              >
                                {showPassword ? (
                                  <Visibility
                                    sx={{
                                      color: "rgba(0, 0, 0, 0.4)",
                                      fontSize: "16px",
                                    }}
                                  />
                                ) : (
                                  <VisibilityOff
                                    sx={{
                                      color: "rgba(0, 0, 0, 0.4)",
                                      fontSize: "16px",
                                    }}
                                  />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        size="small"
                      />
                    )}
                  </Field>
                  <Typography
                    sx={{ mt: 1, fontSize: "0.8rem", color: "red", ml: 2 }}
                  >
                    <ErrorMessage name="password" />
                  </Typography>
                </div>
                <div className="mb-12">
                  <Field name="confirmPassword">
                    {({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-basic"
                        placeholder={"Confirm password"}
                        variant="outlined"
                        fullWidth
                        type={showConfirmPassword ? "text" : "password"}
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
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockOutlinedIcon
                                sx={{
                                  color: "rgba(0, 0, 0, 0.4)",
                                  fontSize: "16px",
                                }}
                              />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                edge="end"
                                onClick={handleToggleConfirmPassword}
                              >
                                {showConfirmPassword ? (
                                  <Visibility
                                    sx={{
                                      color: "rgba(0, 0, 0, 0.4)",
                                      fontSize: "16px",
                                    }}
                                  />
                                ) : (
                                  <VisibilityOff
                                    sx={{
                                      color: "rgba(0, 0, 0, 0.4)",
                                      fontSize: "16px",
                                    }}
                                  />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        size="small"
                      />
                    )}
                  </Field>
                  <Typography
                    sx={{ mt: 1, fontSize: "0.8rem", color: "red", ml: 2 }}
                  >
                    <ErrorMessage name="confirmPassword" />
                  </Typography>
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isSubmitting}
                  fullWidth
                  sx={{
                    backgroundColor: "#6C309C",
                    borderRadius: "20px",
                    "&:hover": {
                      backgroundColor: "#6C309C",
                    },
                  }}
                >
                  {loading ? <CircularProgress size={24} /> : "Reset Password"}
                </Button>
              </Form>
            )}
          </Formik>
        </CardLayout>
      </FormLayout>
    );
}

export default Forgot;
