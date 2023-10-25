import React, { useEffect, useState } from "react";
import { get } from "../../server/server";
import ReferralTable from "../../components/dashboard/ReferralTable";
import { Typography } from "@mui/material";

const ReferralUsers = () => {
    const [users, setUsers] = useState();
    const [pendingUsers, setPendingUsers] = useState(0);
  const [approvedUsers, setApprovedUsers] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
      setLoading(true);
        const { res, err } = await get("/users/get");
        if (err) {
          console.error(err);
          setLoading(false);
        }
        if (res) {
          setUsers(res.result);
          setPendingUsers(res.pendingUsersCount);
          setApprovedUsers(res.approvedUsersCount);
          setLoading(false);
        }
    }
    useEffect(() => {
        fetchUsers();
    },[])
  return (
    <div>
      <Typography fontSize="25px" fontWeight="medium" color="#342E59" mb={5}>
        Referral Link
      </Typography>
      <ReferralTable
        users={users}
        pendingUsers={pendingUsers}
        approvedUsers={approvedUsers}
        fetchUsers={fetchUsers}
        loading={loading}
      />
    </div>
  );
};

export default ReferralUsers;
