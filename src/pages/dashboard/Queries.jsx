import CommonTable from "../../components/dashboard/CommonTable";
import { useEffect, useState } from "react";
import FeedbackTable from "../../components/dashboard/FeedbackTable";
import { Alert, CircularProgress } from "@mui/material";
import { get } from "../../server/server";
import FAQsTABLE from "../../components/dashboard/FAQsTABLE";
import QueryTable from "../../components/dashboard/QueryTable";
import Progress from "../../components/CommonProgress/Progress";

const Queries = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [queries, setQueries] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchQueries = async () => {
    setLoading(true);
    setError("");
    try {
      const { res, err } = await get(`/queries/getAll`);
      if (res) {
        console.log(res);
        setQueries(res?.result);
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
    fetchQueries();
  }, []);

  if (loading) return <Progress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <>
      <QueryTable queries={queries} fetchQueries={fetchQueries} />
    </>
  );
};

export default Queries;
