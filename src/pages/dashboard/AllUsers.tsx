import CommonTable from "../../components/dashboard/CommonTable"
import { useEffect } from 'react'


const AllUsers = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <CommonTable
        title='All Users'
      />
    </>
  )
}

export default AllUsers
