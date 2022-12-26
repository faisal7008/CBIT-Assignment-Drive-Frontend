
import { useSelector, useDispatch } from "react-redux";
import { getTeachers } from "../../features/users/userSlice";
import {
  getCourses,
} from "../../features/courses/courseSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClassCard from "./ClassCard";
import { deleteClass, getClasses } from "../../features/classes/classSlice";

export default function Classes() {
  const dispatch = useDispatch();
  const { classes } = useSelector((state) => state.classes);
  const { teachers } = useSelector((state) => state.users);
  const [isShown, setIsShown] = useState(false)
  
  useEffect(() => {
    dispatch(getClasses())
    dispatch(getCourses())
    dispatch(getTeachers())
  }, [])

  const getMentorName = (mentorId) => {
    const mentor = teachers?.filter(teacher => teacher._id === mentorId)
    return mentor[0]?.name
  }

  // const getCourseName = (courseId) => {
  //   const course = courses?.filter(course => course._id === courseId)
  //   return course[0]?.name
  // }

  const handleDelete = (classs) => {
    const choice = window.confirm(
      `Are you sure you want remove ${classs.name}`
    );
    if (choice) {
      dispatch(deleteClass(classs._id));
    }
  };

  return (
    <>
      <header className="bg-white shadow">
      <div className="mx-auto flex justify-between max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Classes
          </h1>
          <button
              className="text-white bg-sky-700 hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-300 font-medium rounded-full text-sm p-2.5 px-3 transition-all text-center mr-2 mb-2"
              // href="./courses"
              onClick={() => setIsShown((current) => !current)}
            >
              {isShown ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg> : "Add a Class"}
            </button>
        </div>
      </header>
      <main className="min-h-screen">
        <div className="mx-auto max-w-7xl py-2 sm:px-6 lg:px-8">
        <div className={isShown ? "block" : "hidden"}><ClassCard/></div>
          <div className="px-4 py-6 sm:px-0">
            <div className="overflow-x-auto relative">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-400 uppercase bg-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      #
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Name
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Semester
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Mentor
                    </th>

                    <th scope="col" className="py-3 px-6">
                      Courses
                    </th>
                    <th scope="col" className="py-3 px-6"></th>
                  </tr>
                </thead>
                <tbody>
                  {classes?.map((classs, key) => (
                    <tr
                      key={classs._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {key+1}
                      </th>
                      <td className="py-4 px-6 capitalize">{classs.name}</td>
                      <td className="py-4 px-6">{classs.semester}</td>
                      <td className="py-4 px-6">{getMentorName(classs.mentor)}</td>
                      <td className="py-4 px-6">
                        {/* <ul> 
                        {classs.courses ? classs.courses.map(course => <li key={course}>
                        {getCourseName(course)}
                      </li>) : "Not yet added"}</ul> */}
                      <ul>
                        {classs.courses.map(course => <li>{course}</li>)}
                      </ul>
                      </td>
                      <td className="py-4 px-6">
                        <button
                          className="rounded border border-transparent bg-rose-600 text-sm font-medium text-white px-5 py-2 text-center hover:bg-rose-700"
                          onClick={() => handleDelete(classs)}
                        >
                          delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
