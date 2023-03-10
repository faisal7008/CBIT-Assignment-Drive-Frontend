import AdminNavbar from "../../components/Admin";
import { Spinner, Card } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCourses,
  deleteCourse,
  reset,
} from "../../features/courses/courseSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "./CourseCard";
import { useState } from "react";

export default function AdminCourses() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { courses, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.courses
  );
  const [isShown, setIsShown] = useState(false)

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getCourses())
    setIsShown(false)
  }, [user, navigate, isError, isSuccess, message, dispatch]);

  const handleDelete = (course) => {
    const choice = window.confirm(
      `Are you sure you want remove ${course.name}`
    );
    if(choice){
      dispatch(deleteCourse(course._id));
      dispatch(reset())
    }
  }

  // if (isLoading) {
  //   return (
  //     <div className="absolute top-2/4 left-2/4">
  //       <Spinner aria-label="Default status example" />
  //     </div>
  //   );
  // }

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto flex justify-between max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Courses
          </h1>
          <button
              className="text-white bg-sky-700 hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-300 font-medium rounded-full text-sm p-2.5 px-3 transition-all text-center mr-2 mb-2"
              // href="./courses"
              onClick={() => setIsShown((current) => !current)}
            >
              {isShown ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg> : "Add a Course"}
            </button>
        </div>
      </header>
      <main className="min-h-screen">
        <div className="mx-auto max-w-7xl py-2 sm:px-6 lg:px-8">
          <div className={isShown ? "block" : "hidden"}><CourseCard/></div>
          <div className="px-4 py-6 sm:px-0">
            <div className="grid sm:grid-cols-2 gap-2 min-w-full">
              {courses.map((course) => (
                <Card
                  key={course._id}
                  horizontal={true}
                  // imgSrc="https://flowbite.com/docs/images/blog/image-4.jpg"
                > 
                <div className="relative">
                  <button
                    className="absolute right-0 top-0"
                    onClick={() => handleDelete(course)}
                  >
                    <div className="p-1 rounded-full bg-transparent transition-all hover:bg-slate-300 dark:text-white dark:hover:bg-gray-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </button>

                  <h5 className="text-2xl w-full pr-8 font-bold tracking-tight text-gray-900 dark:text-white">
                    {course.name}
                  </h5>
                  <p className="font-normal w-full text-gray-700 dark:text-gray-400">
                    {course.semester}th semester
                  </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
