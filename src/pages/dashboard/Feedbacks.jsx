import CommonTable from "../../components/dashboard/CommonTable";
import { useEffect, useState } from "react";
import FeedbackTable from "../../components/dashboard/FeedbackTable";
import { Alert, CircularProgress } from "@mui/material";
import { get } from "../../server/server";
import Progress from "../../components/CommonProgress/Progress";

const Feedbacks = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [feedbacks, setFeedbacks] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchFeedbacks = async () => {
    setLoading(true);
    setError("");
    try {
      const { res, err } = await get(`/feedbacks/getAll`);
      if (res) {
        console.log(res);
        setFeedbacks(res?.result);
      } else {
        setError("No user data found.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching user details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  if (loading) return <Progress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <>
      <FeedbackTable feedbacks={feedbacks} />
    </>
  );
};

export default Feedbacks;
