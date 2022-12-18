import { useDispatch, useSelector } from "react-redux";
import { Chart } from "react-google-charts";
import { useNavigate } from "react-router-dom";
import { getSubmissions } from "../../features/submissions/submissionSlice";
import { useEffect } from "react";
import moment from "moment";
import { getStudents, getTeachers } from "../../features/users/userSlice";
import { getCourses } from "../../features/courses/courseSlice";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { students, teachers } = useSelector((state) => state.users);
  const { courses } = useSelector((state) => state.courses);


  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    // console.log(submissions.length)
    dispatch(getSubmissions());
    dispatch(getTeachers())
    dispatch(getStudents())
    dispatch(getCourses())
  }, [user, dispatch, navigate]);

   const data = [
    ["Batch Year", "Students", "Teachers", "Courses"],
    ["2018", 45, 15, 8],
    ["2019", 54, 18, 7],
    ["2021", 63, 22, 8],
    ["2022", 67, 25, 9],
  ];
  
   const options = {
    chart: {
      title: "College Performance",
      subtitle: "Students, Teachers, and Courses: 2018-2022",
    },
  };

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>
      <main className="min-h-screen">
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div>
            <div className="grid grid-rows-1 mx-2 gap-4 ">
              <Chart
                chartType="Bar"
                data={data}
                options={options}
                width={"100%"}
                height={"400px"}
              />
              <div className="grid grid-cols-3 my-10 gap-4">
              <a
                  href="./courses"
                  className="block p-6 max-w-full  bg-white rounded-lg border border-gray-200 shadow-md  dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  <div className="flex justify-between">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Courses
                  </h5>
                  <p className=" font-semibold font-mono text-3xl text-gray-700 dark:text-gray-400">
                    {courses.length}
                  </p>
                  </div>
                  <div
                    id="assignments_container"
                    className=" grid mt-4 w-full h-72 rounded-md dark:bg-gray-700 overflow-auto"
                  >
                    {courses.map((course) => (
                      <div className="block p-6 max-w-full  bg-gray-300 rounded-none border border-gray-200 shadow-md hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-900 dark:hover:bg-gray-700">
                        {/* <div className="flex justify-between"> */}
                          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {course.name}
                          </h5>
                          <h5 className="text-sm font-medium text-gray-700 dark:text-white">
                            {course.semester} semester
                          </h5>
                        {/* </div> */}
                      </div>
                    ))}
                  </div>
                </a>

                <a
                  href="./students"
                  className="block p-6 max-w-full  bg-white rounded-lg border border-gray-200 shadow-md  dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  <div className="flex justify-between">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Students
                  </h5>
                  <p className=" font-semibold font-mono text-3xl text-gray-700 dark:text-gray-400">
                    {students.length}
                  </p>
                  </div>
                  <div
                    id="assignments_container"
                    className=" grid mt-4 w-full h-72 rounded-md dark:bg-gray-700 overflow-auto"
                  >
                    {students.map((student) => (
                      <div className="block p-6 max-w-full  bg-gray-300 rounded-none border border-gray-200 shadow-md hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-900 dark:hover:bg-gray-700">
                        {/* <div className="flex justify-between"> */}
                          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {student.name}
                          </h5>
                          {/* <h5 className="text-sm font-medium text-gray-700 dark:text-white">
                            {} semester
                          </h5> */}
                        {/* </div> */}
                      </div>
                    ))}
                  </div>
                </a>

                <a
                  href="./teachers"
                  className="block p-6 max-w-full  bg-white rounded-lg border border-gray-200 shadow-md  dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  <div className="flex justify-between">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Teachers
                  </h5>
                  <p className=" font-semibold font-mono text-3xl text-gray-700 dark:text-gray-400">
                    {teachers.length}
                  </p>
                  </div>
                  <div
                    id="assignments_container"
                    className=" grid mt-4 w-full h-72 rounded-md dark:bg-gray-700 overflow-auto"
                  >
                    {teachers.map((teacher) => (
                      <div className="block p-6 max-w-full  bg-gray-300 rounded-none border border-gray-200 shadow-md hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-900 dark:hover:bg-gray-700">
                        {/* <div className="flex justify-between"> */}
                          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {teacher.name}
                          </h5>
                          {/* <h5 className="text-sm font-medium text-gray-700 dark:text-white">
                            {} semester
                          </h5> */}
                        {/* </div> */}
                      </div>
                    ))}
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
