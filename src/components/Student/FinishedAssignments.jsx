import { Alert, Card } from "flowbite-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteSubmission,
  getSubmissions,
  reset,
} from "../../features/submissions/submissionSlice";

export default function FinishedAssignments(props) {
  const { submissions } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.submissions
  );
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    if (isError) {
      setError(message);
    }
    // dispatch(getSubmissions())
  }, [user, isLoading, isSuccess, isError, message, dispatch, navigate]);

  const handleDelete = (id) => {
    dispatch(deleteSubmission(id));
    dispatch(reset());
  };

  const SuccessContainer = () => {
    return (
      <Alert color="success">
        <span>
          <span className="font-medium">Success!</span> {msg}
        </span>
      </Alert>
    );
  };

  return (
    <div className="grid  gap-4 min-w-full">
      {/* {msg && <SuccessContainer/>} */}
      {submissions
        .filter(
          (assignment) => moment(assignment.duedate) < moment(Date.now())
          // assignment.submissions.some(
          //   (stud) =>
          //     stud.assignmentname === assignment.name &&
          //     stud.rollno === user.id_no
          // )
        )
        .map((assignment) => (
          <Card key={assignment._id}>
            <div className="md:flex md:justify-between">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {assignment.name}
              </h5>
              <h5 className="text-sm font-medium text-gray-700 dark:text-white">
                <span className="text-md font-extrabold"> Due on </span>{" "}
                {moment(assignment.duedate).format("lll")}
              </h5>
            </div>
            <div className="md:flex md:justify-between">
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {assignment.course}
              </p>
              <a
                className=" font-semibold text-sky-600"
                target={"_blank"}
                href={assignment.question}
              >
                Assignment Questions
              </a>
            </div>
            {assignment.submissions
              .filter(
                (stud) =>
                  // stud.assignmentname === assignment.name &&
                  stud.rollno === user.id_no
              )
              .map((submission) => (
                <div
                  className="md:flex md:justify-between"
                  key={submission._id}
                >
                  <p className=" font-mono font-bold text-xl text-gray-700 dark:text-gray-400">
                    Score :{" "}
                    {submission.allotedmarks ? submission.allotedmarks : "NA"} /{" "}
                    {assignment.totalmarks}{" "}
                  </p>
                  {submission.allotedmarks === "NA" ? (
                    <div className="inline-flex rounded-md shadow-sm">
                      <button
                        onClick={() => {
                          alert(
                            `Are you sure you want to remove ${submission.assignmentname}`
                          );
                          dispatch(deleteSubmission(submission._id));
                          dispatch(reset());
                          setMsg("Removed Assignment");
                        }}
                        // onClick={handleDelete(submission._id)}
                        className="py-2 px-4 text-sm font-medium text-rose-700 bg-white rounded-md border border-gray-200 hover:bg-gray-100 hover:text-rose-700 focus:z-10 focus:ring-2 focus:ring-rose-700 focus:text-rose-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-rose-500 dark:focus:text-white"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}
                  <a
                    className=" font-semibold text-sky-600"
                    target={"_blank"}
                    href={submission.answer}
                  >
                    Submitted Answer
                  </a>
                </div>
              ))}
            {assignment.submissions.filter(
              (stud) =>
                stud.rollno === user.id_no
            ).length == 0 ? (
              <div className="md:flex md:justify-between">
                <p className=" font-mono font-bold text-xl text-gray-700 dark:text-gray-400">
                  Score : "NA"
                </p>
                <p className="text-xl text-rose-600 dark:text-rose-400">
                  Missed Deadline
                </p>
              </div>
            ) : (
              <></>
            )}
          </Card>
        ))}
    </div>
  );
}
