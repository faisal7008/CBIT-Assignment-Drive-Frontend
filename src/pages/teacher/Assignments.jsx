import TeacherNavbar from "../../components/Teacher";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, Card, Label, Select, Spinner, Alert } from "flowbite-react";
import { getCourses, reset } from "../../features/courses/courseSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import {
  addAssignment,
  getAssignments,
} from "../../features/assignments/assignmentSlice";
import { getSubmissions } from "../../features/submissions/submissionSlice";
import Submissions from "./Submissions";
import CreateAssignment from "../../components/Teacher/CreateAssignment";
import PendingAssignment from "../../components/Teacher/PendingAssignment";
import CompletedAssignment from "../../components/Teacher/CompletedAssignment";

export default function TeacherAssignments() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { courses } = useSelector((state) => state.courses);
  const { assignments } = useSelector(
    (state) => state.assignments
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    dispatch(getCourses());
    dispatch(getAssignments());
    dispatch(getSubmissions());
  }, [user, navigate, dispatch]);

  return (
    <>
       <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Assignments
            </h1>
          </div>
        </header>
      <main className="min-h-screen">
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <Tabs.Group aria-label="tabs with underline" style={"underline"}>
              <Tabs.Item title="Create New Assignment">
                <CreateAssignment assignments={assignments} user={user} courses={courses}/>
              </Tabs.Item>
              <Tabs.Item active={true} title="Pending Assignments">
                <PendingAssignment assignments={assignments}/>
              </Tabs.Item>
              <Tabs.Item title="Completed Assignments">
                <CompletedAssignment assignments={assignments}/>
              </Tabs.Item>
            </Tabs.Group>
          </div>
        </div>
      </main>
    </>
  );
}
