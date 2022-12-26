import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { useEffect } from "react";
import Navbar from "../pages/student/Navbar";

export default function Student(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user.role !== "Student") {
      navigate("/login")
    }
  }, [user, navigate, dispatch]);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  const navigation = [
    { name: "Dashboard", href: "/student/dashboard", current: props.dashboard },
    { name: "My Courses", href: "/student/courses", current: props.courses },
    { name: "Submissions", href: "/student/submissions", current: props.submissions },
    { name: "Calendar", href: "/student/calender", current: props.calender },
  ];
  
  return (
    <>
      <div className="min-h-full">
        <Navbar navigation={navigation} onLogout={onLogout} user={user} />
        <div className="component min-h-screen">{props.StudentComponent}</div>
      </div>
    </>
  );
}
