import { useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  //console.log(userInfo.user.email)
  const navigate = useNavigate()

  return (
    userInfo && userInfo.user.role === 'Admin' ? (
        <Outlet />
      ) : (
         navigate("/")
      )
  )
};
export default AdminRoute;