import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateSubmission,
  reset,
} from "../../features/submissions/submissionSlice";

export default function Submissions(props) {
  const { submissions, isSuccess } = props;
  const [marks, setMarks] = useState("NA");
  const [feedback, setFeedback] = useState("")
  const [studentId, setStudentId] = useState(-1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    
  }, [isSuccess])
  

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(studentId);
    const studentData = {
      id: studentId,
      updatedData: {
        allotedmarks: marks,
        feedback: feedback,
      },
    };
    dispatch(updateSubmission(studentData));
    dispatch(reset());
    navigate(0);
  };

  return (
    <>
      <div className="overflow-x-auto mt-4 relative shadow-md sm:rounded-lg">
      <form onSubmit={onSubmit}>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                Roll No
              </th>
              <th scope="col" className="py-3 px-6">
                Student Name
              </th>
              <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                Submitted Answer
              </th>
              <th scope="col" className="py-3 px-6">
                Posted On
              </th>
              <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                Alloted Marks
              </th>
              <th scope="col" className="py-3 px-6">
                Feedback
              </th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((stud) => (
              <tr
                key={stud._id}
                className=" border-gray-200 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                >
                  {stud.rollno}
                </th>
                <td className="py-4 px-6">
                  {stud.name}
                </td>
                <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                  <a
                    className="font-semibold text-sky-600"
                    target={"_blank"}
                    href={stud.answer}
                  >
                    {stud.rollno + "_answer"}
                  </a>
                </td>
                <td className="py-4 px-6">
                  {moment(stud.updatedAt).format("lll")}
                </td> 
                <td className="py-4 px-6 w-2/12 bg-gray-50 dark:bg-gray-800">
                    <div className="relative">
                      <input
                        type="text"
                        id="small_outlined"
                        name="allotedmarks"
                        onChange={(e) => {
                          setStudentId(stud._id);
                          if (feedback === "") {
                            setFeedback(stud.feedback);
                          }
                          setMarks(e.target.value);
                          
                        }}
                        defaultValue={stud.allotedmarks}
                        className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      />
                      <label
                        htmlFor="small_outlined"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1"
                      >
                        Allot Marks
                      </label>
                    </div>
                    
                 
                </td>
                <td className="py-4 px-6">
                <div className="relative">
                      <input
                        type="text"
                        id="small_outlined"
                        name="feedback"
                        onChange={(e) => {
                          setStudentId(stud._id);
                          if (marks === "NA") {
                            setMarks(stud.marks);
                          }
                          setFeedback(e.target.value);
                        }}
                        on
                        defaultValue={stud.feedback}
                        className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      />
                      <label
                        htmlFor="small_outlined"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1"
                      >
                        Feedback
                      </label>
                    </div>
                    <button className="absolute right-8 -mt-8" type="submit">
                      <i className="fas fa-paper-plane"></i>
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </form>
      </div>
    </>
  );
}
