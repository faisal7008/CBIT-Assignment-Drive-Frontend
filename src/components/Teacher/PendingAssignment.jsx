import { Card } from "flowbite-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Submissions from "./Submissions";

export default function PendingAssignment(props) {
  const {assignments} = props
  const { user } = useSelector((state) => state.auth);
  const { submissions, isSuccess } = useSelector((state) => state.submissions);
  const [isShown, setIsShown] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(-1);

  useEffect(() => {
  }, [isSuccess, submissions, assignments]);

  const handleClick = (assignment) => {
    setSelectedAssignment(assignment);
    if (selectedAssignment._id === assignment._id) {
      setIsShown((current) => !current);
    }
  };

  return (
    <div className="grid  gap-4 min-w-full">
      {submissions
        .filter(
          (assignment) =>
            assignment.createdBy === user.name &&
            moment(assignment.duedate) > moment(Date.now())
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
              <button
                className="absolute mt-4  sm:right-2/4 dark:text-white"
                onClick={() => handleClick(assignment._id)}
              >
                <i
                  className={
                    assignment._id === selectedAssignment && isShown
                      ? "fas fa-chevron-circle-up fa-lg"
                      : "fas fa-chevron-circle-down fa-lg"
                  }
                ></i>
              </button>
              <a
                className=" font-semibold text-sky-600"
                target={"_blank"}
                href={assignment.question}
              >
                Assignment Questions
              </a>
            </div>
            <div
              className={
                assignment._id === selectedAssignment && isShown
                  ? "visible"
                  : "hidden"
              }
            >
              <Submissions submissions={assignment.submissions} isSuccess={isSuccess} />
            </div>
          </Card>
        ))}
    </div>
  );
}
