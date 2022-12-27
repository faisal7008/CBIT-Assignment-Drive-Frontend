import { Alert, Card, Label, Select, Spinner } from "flowbite-react";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addAssignment,
  reset,
} from "../../features/assignments/assignmentSlice";
import {getClasses} from "../../features/classes/classSlice"
import { sendAssignmentEmail } from "../../utils/Mailer";
import { getStudents } from "../../features/users/userSlice"
import moment from "moment";

export default function CreateAssignment(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courses, user, assignments } = props;
  const {classes} = useSelector(state => state.classes)
  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.assignments
  );
  const { students } = useSelector((state) => state.users);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    course: "",
    classId: "",
    marks: "",
    duedate: "",
  });
  const { name, course, marks, duedate, classId } = formData;
  const [selectedFile, setSelectedFile] = useState("");
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [myCourses, setMyCourses] = useState(null)

  useEffect(() => {
    if (isError) {
      setError(message);
    }
    dispatch(getStudents())
    dispatch(getClasses())
  }, [navigate, dispatch, isSuccess, isError, message]);

  useEffect(() => {
    classes.filter(c => c._id === selectedCourse).map(c => setMyCourses(c.courses))
    console.log(myCourses);
  }, [selectedCourse])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendingMailsToStudents = async (assignmentData) => {
    students.map((stud) => {
      sendAssignmentEmail(stud.name, stud.email, assignmentData.createdBy, assignmentData.name, assignmentData.totalmarks, moment(assignmentData.duedate).format("lll"));
    })
  }

  const onFileSelect = (e) => {
    const reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onloadend = () => {
        setSelectedFile(reader.result)
    }
    console.log(selectedFile)
  }

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(selectedFile)
    const assignmentData = {
      name,
      createdBy: user.name,
      course,
      classId,
      totalmarks: marks,
      duedate,
      question: selectedFile,
    };
    // console.log(assignmentData);
    dispatch(addAssignment(assignmentData));
    // dispatch(reset());
    if (isSuccess && !isError) {
      setMsg("Assignment created successfully!");
    }
    // sendingMailsToStudents(assignmentData);
    
  };

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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5"
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5"
              value={marks}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-6">
            <div id="select">
              <div className="mb-2 block">
                <Label htmlFor="classes" value="Select your class" />
              </div>
              <select
                id="classes"
                name="classId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5"
                value={classId}
                onChange={onChange}
                required={true}
              >
                <option>Select your Class</option>
                {classes.map((c) => (
                  <option key={c._id} onClick={() => setMyCourses(c.courses)} value={c._id}>
                    <button type="button" onClick={() => setSelectedCourse(c._id)} className="p-2"> {c.name} </button>
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-6">
            <div id="select">
              <div className="mb-2 block">
                <Label htmlFor="courses" value="Select your course" />
              </div>
              <select
                id="courses"
                name="course"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5"
                value={course}
                onChange={onChange}
                required={true}
              >
                <option>Select your Course</option>
                {myCourses?.map((course) => (
                  <option className=" text-slate-900" key={course} value={course}>
                     {course}
                  </option>
                ))}
              </select>
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full"
              id="file_input"
              type="file"
              onChange={(e) => onFileSelect(e)}
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
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 datepicker-input"
              placeholder="Select date"
              value={duedate}
              onChange={onChange}
            />
          </div>
          <button
            type="submit"
            className="text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800"
          >
            Create
          </button>
        </form>
      </Card>
    </div>
  );
}
