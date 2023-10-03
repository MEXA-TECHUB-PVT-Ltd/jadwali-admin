import React from 'react'
import CommonTable from '../../components/dashboard/CommonTable'
import UserDetailModel from '../../components/Models/UserDetailModel'

const SubscribedUsers = () => {
  return (
      <>
          <CommonTable
              title='Subscribed Users'
              status='STATUS'
          />
          <UserDetailModel />
      </>
  )
}

export default SubscribedUsers
