import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { useEffect } from "react";
import Navbar from "../pages/teacher/Navbar";

export default function Teacher(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user && isSuccess) {
      navigate("/");
    }
    if (user.role !== "Teacher") {
      navigate("/login")
    }
    
  }, [user, isSuccess, isLoading, isError, message, navigate, dispatch]);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  const navigation = [
    { name: "Dashboard", href: "/teacher/dashboard", current: props.dashboard },
    { name: "My Courses", href: "/teacher/courses", current: props.courses },
    { name: "Assignments", href: "/teacher/assignments", current: props.assignments },
    { name: "Calendar", href: "/teacher/calender", current: props.calender },
  ];

  return (
    <>
      <div className="min-h-full">
        <Navbar navigation={navigation} onLogout={onLogout} user={user} />
        <div className="component min-h-screen">{props.TeacherComponent}</div>
      </div>
    </>
  );
}
