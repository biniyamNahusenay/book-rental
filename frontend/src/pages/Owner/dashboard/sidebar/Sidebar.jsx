import React from 'react'
import CommonSidebar from '../../../../components/CommonSidebar'
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const role = userInfo?.user.role
  return (
    <>
      <CommonSidebar role={role}/>
    </>
  )
}

export default Sidebar
