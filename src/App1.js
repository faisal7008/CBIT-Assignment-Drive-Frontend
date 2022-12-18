import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Footer from "./pages/Footer";
import Register from "./pages/admin/Register";
import Students from "./pages/admin/Students";
import Teachers from "./pages/admin/Teachers";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminCourses from "./pages/admin/Courses";
import StudentDashboard from "./pages/student/Dashboard";
import StudentCourses from "./pages/student/Courses";
import StudentSubmissions from "./pages/student/Submissions";
import StudentCalender from "./pages/student/Calender";
import StudentProfile from "./pages/student/StudentProfile";
import TeacherDashboard from "./pages/teacher/Dashboard";
import TeacherCourses from "./pages/teacher/Courses";
import TeacherAssignments from "./pages/teacher/Assignments";
import TeacherCalender from "./pages/teacher/Calender";
import TeacherProfile from "./pages/teacher/TeacherProfile";
import AdminProfile from "./pages/admin/AdminProfile";
import Admin from "./components/Admin"
import Student from "./components/Student";
import Teacher from "./components/Teacher";
import UserRegister from "./pages/UserRegister";

const AdminLayout = () => (
  <div>
    <h1 className="hidden">Admin Layout</h1>
    {/* <AdminDashboard /> */}
    <Outlet />
  </div>
);

const TeacherLayout = () => (
  <div>
    <h1 className="hidden">Teacher Layout</h1>
    <Outlet />
  </div>
);

const StudentLayout = () => (
  <div>
    <h1 className="hidden">Student Layout</h1>
    <Outlet />
  </div>
);

const PublicLayout = () => (
  <div>
    <h1 className="hidden">Public Layout</h1>
    <Outlet />
  </div>
);

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="app min-h-screen">
      <Router>
        <Routes>
          {/* Admin Routes */}
          <Route element={<AdminLayout />}>
            {/* Admin Routes */}
            <Route
              path="admin/register"
              element={user ? <Register /> : <Navigate replace to="/login" />}
            />
            <Route
              path="admin/dashboard"
              element={
                user ? (
                  <Admin
                    AdminComponent={<AdminDashboard />}
                    dashboard={true}
                  />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
            <Route
              path="admin/courses"
              element={
                user ? (
                  <Admin
                    AdminComponent={<AdminCourses />}
                    courses={true}
                  />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
            <Route
              path="admin/students"
              element={
                user ? (
                  <Admin
                    AdminComponent={<Students />}
                    students={true}
                  />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
            <Route
              path="admin/teachers"
              element={
                user ? (
                  <Admin
                    AdminComponent={<Teachers />}
                    teachers={true}
                  />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
            <Route
              path="admin/profile"
              element={
                user ? (
                  <Admin
                    AdminComponent={<AdminProfile />}
                  />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
          </Route>
          {/* Student Routes */}
          <Route element={<StudentLayout />}>
            <Route
              path="student/dashboard"
              element={
                user ? <Student StudentComponent={<StudentDashboard/>} dashboard={true}/> : <Navigate replace to="/login" />
              }
            />
            <Route
              path="student/courses"
              element={
                user ? <Student StudentComponent={<StudentCourses/>} courses={true} /> : <Navigate replace to="/login" />
              }
            />
            <Route
              path="student/submissions"
              element={
                user ? <Student StudentComponent={<StudentSubmissions/>} submissions={true} /> : <Navigate replace to="/login" />
              }
            />
            <Route
              path="student/calender"
              element={
                user ? <Student StudentComponent={<StudentCalender/>} calender={true} /> : <Navigate replace to="/login" />
              }
            />
            <Route
              path="student/profile"
              element={
                user ? <Student StudentComponent={<StudentProfile/>} /> : <Navigate replace to="/login" />
              }
            />
          </Route>
          {/* Teacher Routes */}
          <Route element={<TeacherLayout />}>
            <Route
              path="teacher/dashboard"
              element={
                user ? <Teacher TeacherComponent={<TeacherDashboard/>} dashboard={true} /> : <Navigate replace to="/login" />
              }
            />
            <Route
              path="teacher/courses"
              element={
                user ? <Teacher TeacherComponent={<TeacherCourses/>} courses={true} /> : <Navigate replace to="/login" />
              }
            />
            <Route
              path="teacher/assignments"
              element={
                user ? <Teacher TeacherComponent={<TeacherAssignments/>} assignments={true} /> : <Navigate replace to="/login" />
              }
            />
            <Route
              path="teacher/calender"
              element={
                user ? <Teacher StudentComponent={<TeacherCalender/>} calender={true} /> : <Navigate replace to="/login" />
              }
            />
            <Route
              path="teacher/profile"
              element={
                user ? <Teacher TeacherComponent={<TeacherProfile/>} /> : <Navigate replace to="/login" />
              }
            />
          </Route>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<UserRegister />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
