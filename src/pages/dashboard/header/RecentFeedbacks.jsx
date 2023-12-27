import { useEffect, useState } from "react";
import UserTable from "../../../components/dashboard/UserTable";
import { Button, CircularProgress, Typography } from "@mui/material";
import { users } from "../../../utils/dashboard";
import { Link } from "react-router-dom";
import { get } from "../../../server/server";
import FeedbackTable from "../../../components/dashboard/FeedbackTable";
import Progress from "../../../components/CommonProgress/Progress";

const RecentFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFeedbacks = async () => {
    setLoading(true);
    const { res, err } = await get("/feedbacks/getAll?limit=5&page=1");
    if (err) {
      console.error(err);
      setLoading(false);
    }
    if (res) {
      setFeedbacks(res?.result);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);
    
  if (loading) return <Progress />;
    

  return (
    <>
      <div className="flex justify-between items-center flex-wrap mt-10 mb-5">
        <Typography fontSize="25px">Recent Feedbacks</Typography>
        <Button
          variant="contained"
          component={Link}
          to={"/dashboard/feedbacks"}
          sx={{
            backgroundColor: "#6C309C",
            borderRadius: "20px",
            "&:hover": {
              backgroundColor: "#6C309C",
            },
          }}
        >
          View All Feedbacks
        </Button>
      </div>
      <FeedbackTable feedbacks={feedbacks} dashboard={true} />
    </>
  );
};

export default RecentFeedbacks;
