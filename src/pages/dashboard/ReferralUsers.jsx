import React, { useEffect, useState } from "react";
import { get } from "../../server/server";
import ReferralTable from "../../components/dashboard/ReferralTable";

const ReferralUsers = () => {
    const [users, setUsers] = useState();
    const [pendingUsers, setPendingUsers] = useState(0);
    const [approvedUsers, setApprovedUsers] = useState(0)
    console.log("HELLO WORLD")

    const fetchUsers = async () => {
        const { res, err } = await get("/users/get");
        if (err) {
            console.error(err);
        }
        if (res) {
            console.log(res);
            setUsers(res.result);
            setPendingUsers(res.pendingUsersCount);
            setApprovedUsers(res.approvedUsersCount);
        }
    }
    useEffect(() => {
        fetchUsers();
    },[])
  return (
    <div>
      <ReferralTable users={users} pendingUsers={pendingUsers} approvedUsers={approvedUsers} />
    </div>
  );
};

export default ReferralUsers;
