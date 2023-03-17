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
import Classes from "./pages/admin/Classes";

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
          <Route path="admin" element={user ? <AdminLayout /> : <Navigate replace to="/login" />}>
            {/* Admin Routes */}
            <Route
              path="register"
              element={<Register />}
            />
            <Route
              path="dashboard"
              element={
                  <Admin
                    AdminComponent={<AdminDashboard />}
                    dashboard={true}
                  />
              }
            />
            <Route
              path="courses"
              element={
                  <Admin
                    AdminComponent={<AdminCourses />}
                    courses={true}
                  />
              } />
              <Route
                path="classes"
                element={
                    <Admin
                      AdminComponent={<Classes />}
                      classes={true}
                    />
                } />
            <Route
              path="students"
              element={
                  <Admin
                    AdminComponent={<Students />}
                    students={true}
                  />
              }
            />
            <Route
              path="teachers"
              element={
                  <Admin
                    AdminComponent={<Teachers />}
                    teachers={true}
                  />
              }
            />
            <Route
              path="profile"
              element={
                  <Admin
                    AdminComponent={<AdminProfile />}
                  />
              }
            />
          </Route>
          {/* Student Routes */}
          <Route path="student" element={user? <StudentLayout /> : <Navigate replace to="/login" />}>
            <Route
              path="dashboard"
              element={
                 <Student StudentComponent={<StudentDashboard/>} dashboard={true}/>
              }
            />
            <Route
              path="courses"
              element={
                <Student StudentComponent={<StudentCourses/>} courses={true} />
              }
            />
            <Route
              path="submissions"
              element={
                <Student StudentComponent={<StudentSubmissions/>} submissions={true} />
              }
            />
            <Route
              path="calender"
              element={
                <Student StudentComponent={<StudentCalender/>} calender={true} />
              }
            />
            <Route
              path="profile"
              element={
                <Student StudentComponent={<StudentProfile/>} />
              }
            />
          </Route>
          {/* Teacher Routes */}
          <Route path="teacher" element={user ? <TeacherLayout /> : <Navigate replace to="/login" />}>
            <Route
              path="dashboard"
              element={
                <Teacher TeacherComponent={<TeacherDashboard/>} dashboard={true} />
              }
            />
            <Route
              path="courses"
              element={
                <Teacher TeacherComponent={<TeacherCourses/>} courses={true} />
              }
            />
            <Route
              path="assignments"
              element={
                 <Teacher TeacherComponent={<TeacherAssignments/>} assignments={true} /> 
              }
            />
            <Route
              path="calender"
              element={
                <Teacher StudentComponent={<TeacherCalender/>} calender={true} />}
            />
            <Route
              path="profile"
              element={
                <Teacher TeacherComponent={<TeacherProfile/>} /> 
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
