import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { CardContent, Typography, IconButton, Avatar, Button, Modal, TextField, useTheme } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ToastModal from './TostModal';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import BoxStyle from './StylesModal/BoxStyle';


const SubscriptionSchema = Yup.object().shape({
    planName: Yup.string()
        .required('Required')
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};


const SubscriptionModel = ({ open, setOpen, handleClose, title, eventMessage, setToastOpen, toastOpen }) => {
    const [planName, setPlanName] = React.useState("");

const theme = useTheme();



    const { state } = useLocation();
    const navigate = useNavigate();


    const [plan, setPlan] = React.useState(state?.plan || "");
    const [previousPage, setPreviousPage] = React.useState(state?.previousPage || "");
    const [selectedFeatures, setSelectedFeatures] = React.useState(state?.selectedFeatures || []);


    const addFeatures = localStorage.getItem('AddFeatures');
    const feature = JSON.parse(addFeatures) || null

    React.useEffect(() => {
        if (previousPage === 'features' && localStorage.getItem("shouldOpenModal") === "true") {
            console.log("opent the modal");
            if (localStorage.getItem("shouldOpenModal") === "true") {
                setOpen(true);
                console.log('open the modal')
            }
            else {
                console.log('close the modal')
                setOpen(false);
                setPlan('');
                setPreviousPage('');
                setSelectedFeatures([]);
                localStorage.setItem("shouldOpenModal", "false");
            }
        }
        else {
            localStorage.setItem("shouldOpenModal", "false");
            setPlan('');
            setPreviousPage('');
            setSelectedFeatures([]);

        }
    }, []);



    React.useEffect(() => {
        if (localStorage.getItem("shouldOpenModal") === 'false') {
            setToastOpen(false);
        }
    }, []);

    const handleCloseToast = () => {
        setToastOpen(false);
    };


    const body = (
      <div style={{ backgroundColor: "rgba(0, 0, 0, 0.16)" }}>
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
                  {title}
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
                    planName: plan ? plan : "",
                    selectFeatures: "",
                  }}
                  validationSchema={SubscriptionSchema}
                  onSubmit={(values) => {
                    console.log(values);
                    setToastOpen(true);
                    // navigate('/dashboard/subscription-plan')
                    setTimeout(() => {
                      setOpen(false);
                      setPlan("");
                      setPreviousPage("");
                      setToastOpen(false);
                      localStorage.setItem(
                        "shouldOpenModal",
                        JSON.stringify(false)
                      );
                      localStorage.setItem("AddFeatures", JSON.stringify([]));
                    }, 1000);
                  }}
                >
                  {({ errors, touched, isValid, setFieldValue }) => (
                    <Form>
                      <div className="mb-4">
                        <Field
                          name="planName"
                          as={TextField}
                          id="outlined-basic"
                          placeholder={"Plan Name"}
                          variant="outlined"
                          fullWidth
                          onChange={(e) => {
                            setFieldValue("planName", e.target.value);
                            setPlanName(e.target.value);
                          }}
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
                        {errors.planName &&
                        typeof errors.planName === "string" ? (
                          <Typography
                            sx={{
                              mt: 1,
                              fontSize: "0.8rem",
                              color: "red",
                              ml: 2,
                            }}
                          >
                            {errors.planName}
                          </Typography>
                        ) : null}
                      </div>

                      {feature && feature?.length > 0 ? (
                        <>
                          <div className=""></div>
                          <Typography mb={2}>Features</Typography>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {selectedFeatures.map((feature) => (
                              <span
                                key={feature.id}
                                className="bg-[#F5F5F5] px-2 py-1 rounded-full"
                              >
                                {feature.featuresDescription}
                              </span>
                            ))}
                            <Link
                              to="/dashboard/features"
                              state={{
                                plan: planName ? planName : undefined,
                                previousPage: "subscription",
                                previousFeatures: selectedFeatures,
                                modalName: "Add",
                                openAddModal: "true",
                              }}
                              className="mb-4 bg-[#6C309C] text-white p-2 px-4 rounded-[20px] flex justify-between items-center cursor-pointer"
                            >
                              <Typography sx={{ color: "#fff" }}>
                                Add more features
                              </Typography>
                              <KeyboardArrowDownIcon />
                            </Link>
                          </div>
                        </>
                      ) : (
                        <Link
                          to="/dashboard/features"
                          state={{
                            plan: planName ? planName : undefined,
                            previousPage: "subscription",
                            openAddModal: "true",
                          }}
                          className="mb-4 bg-[#F5F5F5] p-2 px-4 rounded-[20px] flex justify-between items-center cursor-pointer"
                        >
                          <Typography sx={{ color: "#787878" }}>
                            Select Features
                          </Typography>
                          <KeyboardArrowDownIcon />
                        </Link>
                      )}

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
      </div>
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
}

export default SubscriptionModel;

