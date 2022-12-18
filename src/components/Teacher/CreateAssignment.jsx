import { Alert, Card, Label, Select, Spinner } from "flowbite-react";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addAssignment,
  reset,
} from "../../features/assignments/assignmentSlice";
import { sendAssignmentEmail } from "../../utils/Mailer";
import { getStudents } from "../../features/users/userSlice"
import moment from "moment";

export default function CreateAssignment(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courses, user, assignments } = props;
  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.assignments
  );
  const { students } = useSelector((state) => state.users);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    course: "",
    marks: "",
    duedate: "",
  });
  const { name, course, marks, duedate } = formData;
  const [selectedFile, setSelectedFile] = useState("");
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    if (isError) {
      setError(message);
    }
    dispatch(getStudents())
  }, [navigate, dispatch, assignments, isSuccess, isError, message]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // const sendingMailsToStudents = async (assignmentData) => {
  //   students.map((stud) => {
  //     sendAssignmentEmail(stud.name, stud.email, assignmentData.createdBy, assignmentData.name, assignmentData.totalmarks, moment(assignmentData.duedate).format("lll"));
  //   })
  // }

  const onSubmit = (e) => {
    e.preventDefault();
    const assignmentData = {
      name,
      createdBy: user.name,
      course,
      totalmarks: marks,
      duedate,
      question: selectedFile,
    };
    dispatch(addAssignment(assignmentData));
    dispatch(reset());
    if (isSuccess && !isError) {
      setMsg("Assignment created successfully!");
    }
    // sendingMailsToStudents(assignmentData);
    
  };

  if (isLoading) {
    return (
      <div className="absolute top-2/4 left-2/4">
        <Spinner aria-label="Default status example" />
      </div>
    );
  }

  const ErrorContainer = () => {
    return (
      <Alert color="failure">
        <span>
          <span className="font-medium">Error!</span> {error}
        </span>
      </Alert>
    );
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
    <div className="md:w-3/4">
      <Card>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Create New Assignment
        </h5>
        {error ? <ErrorContainer /> : <></>}
        {msg ? <SuccessContainer /> : <></>}
        <form
          className="min-w-full mt-2"
          // encType="multipart/form-data"
          // method="POST"
          onSubmit={onSubmit}
        >
          <div className="mb-6">
            <label
              htmlFor="text"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Assignment Name
            </label>
            <input
              type="text"
              id="text"
              name="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={name}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="text"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Total Marks
            </label>
            <input
              type="text"
              id="text"
              name="marks"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={marks}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-6">
            <div id="select">
              <div className="mb-2 block">
                <Label htmlFor="courses" value="Select your course" />
              </div>
              <Select
                id="courses"
                name="course"
                value={course}
                onChange={onChange}
                required={true}
              >
                <option>Select your Course</option>
                {courses.map((course) => (
                  <option key={course._id} value={course.name}>
                    {course.name}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              htmlFor="default_size"
            >
              Upload Assignment Questions
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="file_input"
              type="file"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              name="question"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              htmlFor="default_size"
            >
              Due date
            </label>

            <input
              type="datetime-local"
              name="duedate"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input"
              placeholder="Select date"
              value={duedate}
              onChange={onChange}
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create
          </button>
        </form>
      </Card>
    </div>
  );
}
