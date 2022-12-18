import { Alert, Spinner } from "flowbite-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addSubmission,
  getSubmissions,
  reset,
} from "../../features/submissions/submissionSlice";
import {sendSubmissionEmail} from "../../utils/Mailer"

export default function SubmissionCard(props) {
  const { assignment, msg, setMsg } = props;
  const [selectedFile, setSelectedFile] = useState("");
  // const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const { submissions, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.submissions
  );

  useEffect(() => {
    if (isError) {
      setError(message);
    }
    if (!user) {
      navigate("/login");
    }
    dispatch(getSubmissions());
  }, [user, isSuccess, isError, message, dispatch, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    
    const submissionData = {
      name: user.name,
      rollno: user.id_no,
      assignmentname: assignment.name,
      answer: selectedFile,
    };
    try {
      dispatch(addSubmission(submissionData));
      setMsg("Assignment Submitted!");
      // window.location.reload()
    } catch (error) {
      setError(error.message)
    }
    dispatch(reset())
    // if (isSuccess && !isError) {
    //   setMsg("Assignment Submitted!");
    // }
    // sendSubmissionEmail(user.name, user.email, `You've successfully submitted ${submissionData.assignmentname}`);
  };


  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner aria-label="Default status example" />
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto relative border-gray-100 shadow-md sm:rounded-r-lg">
        <div className="">
        {/* {message && <ErrorContainer />} */}
        {/* {msg && <SuccessContainer />} */}
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-sm text-center text-gray-700 uppercase dark:text-gray-300">
            <tr className="border-b-2 border-gray-200 dark:border-gray-600">
              <th
                scope="col"
                colSpan={2}
                className="py-3 px-6 bg-gray-100 dark:bg-gray-700"
              >
                Assignment Submission
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200 dark:border-gray-600">
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                Assignment Name
              </th>
              <td className="py-4 px-6 dark:text-white dark:bg-gray-700">
                {assignment.name}
              </td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-600">
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                Course Name
              </th>
              <td className="py-4 px-6 dark:text-white dark:bg-gray-700">
                {assignment.course}
              </td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-600">
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                Created by
              </th>
              <td className="py-4 px-6 dark:text-white dark:bg-gray-700">
                {assignment.createdBy}
              </td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-600">
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                Due date
              </th>
              <td className="py-4 px-6 dark:text-white dark:bg-gray-700">
                {moment(assignment.duedate).format("lll")}
              </td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-600">
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                Question Paper
              </th>
              <td className="py-4 px-6 dark:text-white dark:bg-gray-700">
                <a
                  className="font-semibold text-sky-600"
                  target={"_blank"}
                  href={assignment.question}
                >
                  Assignment Questions
                </a>
              </td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td colSpan={2}>
                <div className="flex justify-center items-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    {selectedFile ? (
                      <>
                        <p className="mb-2 text-md font-bold text-gray-700 dark:text-gray-200">
                          {selectedFile.name}
                        </p>
                      </>
                    ) : (
                      <div className="flex flex-col justify-center items-center pt-5 pb-6">
                        <svg
                          aria-hidden="true"
                          className="mb-3 w-10 h-10 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <p className="mb-2 text-md font-bold text-gray-700 dark:text-gray-200">
                          Upload your answers
                        </p>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          JPG, DOCX or PDF (MAX. 5MB)
                        </p>
                      </div>
                    )}
                    <form onSubmit={onSubmit} id="submission-form">
                      <input
                        id="dropzone-file"
                        type="file"
                        name="answer"
                        className="hidden"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                        // required
                      />
                    </form>
                  </label>
                </div>
              </td>
            </tr>
            <tr className="border-t-2 text-center border-gray-200 dark:border-gray-600">
              <td
                scope="col"
                colSpan={2}
                className="font-bold rounded-b-md text-white bg-sky-600 dark:bg-sky-700"
              >
                <button
                  className="py-3 px-6 w-full h-full rounded-md"
                  form="submission-form"
                  type="submit"
                >
                  {" "}
                  Submit{" "}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
