import CommonTable from "../../components/dashboard/CommonTable";
import { useEffect, useState } from "react";
import FeedbackTable from "../../components/dashboard/FeedbackTable";
import { Alert, CircularProgress } from "@mui/material";
import { get } from "../../server/server";
import FAQsTABLE from "../../components/dashboard/FAQsTABLE";
import Progress from "../../components/CommonProgress/Progress";
import EventPaymentTable from "../../components/dashboard/EventPaymentTable";

const EventPayments = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [faqs, setFAQs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchFAQs = async () => {
    setLoading(true);
    setError("");
    try {
      const { res, err } = await get(`/schedule/getAllTempSchedules?limit=100000000`);
      if (res) {
        console.log(res);
        setFAQs(res?.result);
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
    fetchFAQs();
  }, []);

  if (loading) return <Progress />;
  if (error) return <Alert severity="error">Payment records are not available</Alert>;

  return (
    <>
      <EventPaymentTable faqs={faqs} fetchFAQs={fetchFAQs} />
    </>
  );
};

export default EventPayments;
