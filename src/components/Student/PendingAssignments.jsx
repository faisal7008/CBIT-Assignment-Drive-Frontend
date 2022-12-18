import { Alert } from "flowbite-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCourses } from "../../features/courses/courseSlice";
import { getSubmissions } from "../../features/submissions/submissionSlice";
import SubmissionCard from "./SubmissionCard";

export default function PendingAssignments(props) {
  const {submissions} = props  
  const [msg, setMsg] = useState("")
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.submissions
  );
  const [selectedAssignment, setSelectedAssignment] = useState({});

  useEffect(() => {
    if(isSuccess){
      setMsg("Assignment Submitted.")
    }
    dispatch(getCourses());
    // dispatch(getSubmissions());
  }, [user, navigate, dispatch]);

  const checkIfAlreadySubmitted = (assignment) => {
    if (
      assignment.submissions.some(
        (stud) =>
          stud.assignmentname === assignment.name && stud.rollno === user.id_no
      )
    ) {
      return true;
    } else {
      return false
    }
    // return false;
  };
  const AlertContainer = () => {
    if (message) {
      return (
        <Alert color="failure">
          <span>
            <span className="font-medium">Error!</span> {message}
          </span>
        </Alert>
      );
    } else if (msg) {
      return (
        <Alert color="success">
          <span>
            <span className="font-medium">Success!</span> {msg}
          </span>
        </Alert>
      );
    } else {
      return <></>;
    }
  };
  
  return (
    <div>
      <div className="alerts mb-4">
      {(msg || message) && <AlertContainer/>}
      </div>
      <button className="md:hidden absolute -ml-6 mt-2" id="collapser"><i class="fas fa-bars fa-lg"></i></button>
    <div className="flex justify-around w-full md:max-h-[38.6rem]">
      <div
        id="assignments_container"
        className=" grid w-2/5 rounded-l-lg dark:bg-gray-800 overflow-auto"
      >
        {submissions
          .filter(
            (assignment) =>
              moment(assignment.duedate) > moment(Date.now()) &&
               !checkIfAlreadySubmitted(assignment)
          )
          .map((assignment) => (
            <div
              className={
                assignment._id === selectedAssignment._id
                  ? "block p-6 max-w-full bg-gray-200 rounded-none border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-700"
                  : "block p-6 max-w-full bg-white rounded-none border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700"
              }
              href="#"
              key={assignment._id}
              style={
                assignment._id === selectedAssignment._id
                  ? { textAlign: "center" }
                  : { textAlign: "left" }
              }
              onClick={() => setSelectedAssignment(assignment)}
            >
              <div className="grid gap-2">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {assignment.name}
                </h5>
                <p className="font-normal text-gray-900 dark:text-gray-400">
                  {assignment.course}
                </p>
                <h5 className="text-sm font-medium text-gray-700 dark:text-white">
                  <span className="text-md font-extrabold"> Due on </span>{" "}
                  {moment(assignment.duedate).format("lll")}
                </h5>
              </div>
            </div>
          ))}
      </div>
      <div className="w-3/5 h-full dark:text-white">
        <SubmissionCard assignment={selectedAssignment} msg={msg} setMsg={setMsg}/>
      </div>
    </div>
    </div>
  );
}
