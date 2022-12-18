import TeacherNavbar from "../../components/Teacher";
import { Spinner, Card } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCourses,
  reset,
} from "../../features/courses/courseSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function TeacherCourses() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { courses, isLoading, isError, message } = useSelector(
    (state) => state.courses
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }
    dispatch(getCourses());
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner aria-label="Default status example" />;
  }

  return (
    <>
       <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              My Courses
            </h1>
          </div>
        </header>
      <main className="min-h-screen">
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid sm:grid-cols-2 gap-2 min-w-full">
              {courses.map((course) => (
                <Card
                  key={course._id}
                  horizontal={true}
                  // imgSrc="https://flowbite.com/docs/images/blog/image-4.jpg"
                >

                  <h5 className="text-2xl w-full font-bold tracking-tight text-gray-900 dark:text-white">
                    {course.name}
                  </h5>
                  <p className="font-normal w-full text-gray-700 dark:text-gray-400">
                    {course.semester}th semester
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
