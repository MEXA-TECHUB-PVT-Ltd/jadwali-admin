import React, { useCallback, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import SubscriptionModel from "../../components/Models/SubscriptionModel";
import EditSubscriptionModel from "../../components/Models/EditSubscriptionModel";
import DeleteModal from "../../components/Models/DeleteModel";
import { get } from "../../server/server";
import Progress from "../../components/CommonProgress/Progress";


const SubscriptionPlan = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState("");
  const [eventMessage, setEventMessage] = React.useState("");
  const [modalData, setModalData] = React.useState();
  const [planName, setPlanName] = React.useState("");
  const [toastOpen, setToastOpen] = React.useState(false);

  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [statusCode, setStatusCode] = React.useState();
  const [isError, setIsError] = React.useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const { res, err } = await get("/subscription_plan/getAll");

    if (res) {
      console.log(res);
      setData(res?.result);
      setIsLoading(false);
      setIsError(false);
      setStatusCode(null);
    }

    if (err) {
      setIsLoading(false);
      console.log(err);
      setIsError(true);
      setStatusCode(err.response.status);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  const handleOpenModal = useCallback((title, message, data) => {
    setModalTitle(title);
    setEventMessage(message);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    localStorage.setItem("shouldOpenModal", "false");
    localStorage.setItem("AddFeatures", JSON.stringify([]));
    setIsModalOpen(false);
  }, []);

  const handleEditOpenModal = useCallback((item) => {
    setToastOpen(false);
    setModalData(item);
    setIsEditModalOpen(true);
  }, []);

  const handleEditCloseModal = useCallback(() => {
    setToastOpen(false);
    localStorage.setItem("shouldOpenSubEdit", "false");
    localStorage.setItem("EditFeatures", JSON.stringify([]));
    setIsEditModalOpen(false);
  }, []);

  const handleDeleteModal = useCallback((item) => {
    setToastOpen(false);
    setModalData(item);
    setIsDeleteModalOpen(true);
  }, []);

  const handleCloseToast = useCallback(() => {
    setToastOpen(false);
  }, []);

  const handleDeleteClick = useCallback(() => {
    setToastOpen(true);
    setTimeout(() => {
      setIsDeleteModalOpen(false);
    }, 500);
  }, []);

  const handleDeleteCloseModal = useCallback(() => {
    setIsDeleteModalOpen(false);
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-10">
        <Typography fontWeight="bold" fontSize="20px" color="#342E59">
          Subscription Plan
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#6C309C",
            borderRadius: "20px",
            "&:hover": {
              backgroundColor: "#6C309C",
            },
          }}
          onClick={handleOpenModal}
        >
          <AddIcon />
          Add Plan
        </Button>
      </div>

      {isError ? (
        statusCode === 404 && <>No Subscription plan</>
      ) : isLoading ? (
        <Progress />
      ) : (
        data?.map((item) => (
          <Card sx={{ marginBottom: 2, padding: 2, borderRadius: "10px" }}>
            <CardContent>
              <div className="flex justify-between flex-wrap items-center mb-4">
                <Typography variant="h5" color="#6C309C" fontWeight="medium">
                  {item?.name} -- {item?.price}
                </Typography>
                <div>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#6C309C",
                      borderRadius: "20px",
                      "&:hover": {
                        backgroundColor: "#6C309C",
                      },
                    }}
                    onClick={() => handleDeleteModal(item)}
                  >
                    <DeleteIcon sx={{ fontSize: "20px", mr: 1 }} />
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#6C309C",
                      borderRadius: "20px",
                      "&:hover": {
                        backgroundColor: "#6C309C",
                      },
                      ml: 2,
                    }}
                    onClick={() => handleEditOpenModal(item)}
                  >
                    <BorderColorIcon sx={{ fontSize: "20px", mr: 1 }} />
                    Edit
                  </Button>
                </div>
              </div>

              {item?.features
                ?.filter((d) => d.isSelected)
                ?.map((d, index) => (
                  <div className="mb-3 flex items-center gap-x-4" key={index}>
                    <div
                      style={{
                        borderRadius: "50%",
                        backgroundColor: "rgba(108, 48, 156, 1)",
                        width: "10px",
                        height: "10px",
                      }}
                    ></div>
                    <Typography variant="h6" sx={{ fontSize: "16px" }}>
                      {d.name}
                    </Typography>
                  </div>
                ))}
            </CardContent>
          </Card>
        ))
      )}

      {/* <Card sx={{ marginBottom: 2, padding: 2, borderRadius: "10px" }}>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h5" color="#6C309C" fontWeight="medium">
              Professional Plan - $ 34
            </Typography>
            <div>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#6C309C",
                  borderRadius: "20px",
                  "&:hover": {
                    backgroundColor: "#6C309C",
                  },
                }}
                onClick={() => handleDeleteModal()}
              >
                <DeleteIcon sx={{ fontSize: "20px", mr: 1 }} />
                Delete
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#6C309C",
                  borderRadius: "20px",
                  "&:hover": {
                    backgroundColor: "#6C309C",
                  },
                  ml: 2,
                }}
                onClick={() =>
                  handleEditOpenModal(pdata, "Professional Plan - $ 34")
                }
              >
                <BorderColorIcon sx={{ fontSize: "20px", mr: 1 }} />
                Edit
              </Button>
            </div>
          </div>
          {pdata.map((d, index) => (
            <div className="mb-3 flex items-center gap-x-4" key={index}>
              <div
                style={{
                  borderRadius: "50%",
                  backgroundColor: "rgba(108, 48, 156, 1)",
                  width: "10px",
                  height: "10px",
                }}
              ></div>
              <Typography variant="h6" sx={{ fontSize: "16px" }}>
                {d.featuresDescription}
              </Typography>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card sx={{ marginBottom: 2, padding: 2, borderRadius: "10px" }}>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h5" color="#6C309C" fontWeight="medium">
              Pro Plan - $ 345
            </Typography>
            <div>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#6C309C",
                  borderRadius: "20px",
                  "&:hover": {
                    backgroundColor: "#6C309C",
                  },
                }}
                onClick={() => handleDeleteModal()}
              >
                <DeleteIcon sx={{ fontSize: "20px", mr: 1 }} />
                Delete
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#6C309C",
                  borderRadius: "20px",
                  "&:hover": {
                    backgroundColor: "#6C309C",
                  },
                  ml: 2,
                }}
                onClick={() => handleEditOpenModal(ppdata, "Pro Plan - $ 345")}
              >
                <BorderColorIcon sx={{ fontSize: "20px", mr: 1 }} />
                Edit
              </Button>
            </div>
          </div>
          {ppdata.map((d, index) => (
            <div className="mb-3 flex items-center gap-x-4" key={index}>
              <div
                style={{
                  borderRadius: "50%",
                  backgroundColor: "rgba(108, 48, 156, 1)",
                  width: "10px",
                  height: "10px",
                }}
              ></div>
              <Typography variant="h6" sx={{ fontSize: "16px" }}>
                {d.featuresDescription}
              </Typography>
            </div>
          ))}
        </CardContent>
      </Card> */}

      <SubscriptionModel
        open={isModalOpen}
        handleClose={handleCloseModal}
        setOpen={setIsModalOpen}
        title={modalTitle}
        eventMessage={eventMessage}
        setToastOpen={setToastOpen}
        toastOpen={toastOpen}
        fetchData={fetchData}
      />
      <EditSubscriptionModel
        open={isEditModalOpen}
        handleClose={handleEditCloseModal}
        setOpen={setIsEditModalOpen}
        modalData={modalData}
        setToastOpen={setToastOpen}
        toastOpen={toastOpen}
        fetchData={fetchData}
      />
      <DeleteModal
        open={isDeleteModalOpen}
        handleClose={handleDeleteCloseModal}
        onDelete={handleDeleteClick}
        title="Delete Subscription Plan"
        paragraph="Do you want to delete this subscription plan?"
        actionText="Delete"
        eventMessage="Subscription Plan Deleted Successfully"
        handleCloseToast={handleCloseToast}
        toastOpen={toastOpen}
        modalData={modalData}
        fetchData={fetchData}
        setOpen={setIsDeleteModalOpen}
      />
    </>
  );
};

export default React.memo(SubscriptionPlan);
