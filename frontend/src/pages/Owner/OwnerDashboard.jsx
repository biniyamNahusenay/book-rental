import { useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const OwnerDashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  //console.log(userInfo.user.email)
  const navigate = useNavigate()

  return (
    userInfo && userInfo.user.role === 'Owner' ? (
        <Outlet />
      ) : (
         navigate("/")
      )
  )
};
export default OwnerDashboard;