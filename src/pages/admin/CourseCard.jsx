import { useState, useEffect } from "react";
import { Alert, Spinner } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainLogo from "../../assets/main-logo.png";
import { addCourse, reset } from "../../features/courses/courseSlice";

export default function CourseCard() {
  const [formData, setFormData] = useState({
    name: "",
    semester: "",
  });
  const [error, setError] = useState(null)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { name, semester } = formData;

  const { user } = useSelector((state) => state.auth);
  const { courses, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.courses
  );

  useEffect(() => {
    if (user.role !== "Admin"){
      navigate("/")
    }
    if (isError) {
      setError(message);
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

      const courseData = {
        name,
        semester
      };
      dispatch(addCourse(courseData));
      dispatch(reset());
    
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

  return (
    <>
      <div className="flex flex-col min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
       
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src={MainLogo}
              height={100}
              width={70}
            />
            <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-gray-900">
              Add New Courses here
            </h2>
          </div>
          {error ? <ErrorContainer /> : <></>}
          <form className="mt-4 space-y-6" onSubmit={onSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Course Name
                </label>
                <input
                  id="course-name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={onChange}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 capitalize px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                  placeholder="Course Name"
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Semester No
                </label>
                <input
                  id="id_no"
                  name="semester"
                  type="text"
                  value={semester}
                  onChange={onChange}
                  required
                  className="relative block w-full appearance-none rounded-b-md border border-gray-300 capitalize px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                  placeholder="Semester No (1-8)"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-sky-600 py-2 px-4 text-sm font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                {/* <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-sky-500 group-hover:text-sky-400"
                    aria-hidden="true"
                  />
                </span> */}
                {isLoading ? (
                  <Spinner aria-label="Default status example" />
                ) : (
                  <>Add</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
