import { useState, useEffect } from "react";
import { Alert, Spinner } from "flowbite-react";
import { LockClosedIcon, ArrowLeftCircleIcon } from "@heroicons/react/20/solid";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainLogo from "../../assets/main-logo.png";
import { addUser, reset } from "../../features/users/userSlice";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    id_no: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { name, id_no, email, role, password, confirmPassword } = formData;

  const { user } = useSelector((state) => state.auth);
  const { users, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    if (user.role !== "Admin"){
      navigate("/")
    }
    if (isError) {
      setError(message);
    }
    if (isSuccess) {
      navigate("/admin/dashboard");
    }
  }, [user, users, isError, isSuccess, message, navigate, dispatch, error]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Password do not match");
    } else {
      const userData = {
        name,
        id_no,
        email,
        role,
        password,
      };
      dispatch(addUser(userData));
      dispatch(reset());
    }
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
      <a onClick={() => navigate("/admin/students")}>
        <ArrowLeftCircleIcon
          className="h-10 w-10 absolute m-4 text-sky-500 hover:text-sky-600 cursor-pointer"
          aria-hidden="true"
        />
      </a>
      <div className="flex flex-col min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        {/* <div
          class="flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
          role="alert"
        >
          <svg
            aria-hidden="true"
            class="flex-shrink-0 inline w-5 h-5 mr-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Danger</span>
          <div>
            <span class="font-medium">
              Ensure that these requirements are met:
            </span>
            <ul class="mt-1.5 ml-4 text-red-700 list-disc list-inside">
              <li>At least 10 characters (and up to 100 characters)</li>
              <li>At least one lowercase character</li>
              <li>
                Inclusion of at least one special character, e.g., ! @ # ?
              </li>
            </ul>
          </div>
        </div> */}
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src={MainLogo}
              height={100}
              width={70}
            />
            <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-gray-900">
              Create New User
            </h2>
          </div>
          {error ? <ErrorContainer /> : <></>}
          <form className="mt-4 space-y-6" onSubmit={onSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Full Name
                </label>
                <input
                  id="full-name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={onChange}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 capitalize px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                  placeholder="Full Name"
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  ID Number
                </label>
                <input
                  id="id_no"
                  name="id_no"
                  type="text"
                  value={id_no}
                  onChange={onChange}
                  required
                  className="relative block w-full appearance-none rounded-none border border-gray-300 capitalize px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                  placeholder="ID Number"
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={onChange}
                  required
                  className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>

              <div>
                <div className="flex">
                  <button
                    className="relative block w-max appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                    type="button"
                    disabled
                  >
                    Role
                  </button>
                  <label htmlFor="roles" className="sr-only">
                    Select an option
                  </label>
                  <select
                    id="roles"
                    className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                    name="role"
                    value={role}
                    onChange={onChange}
                    required
                  >
                    <option>Choose a Role</option>
                    <option value="Admin">Admin </option>
                    <option value="Teacher">Teacher</option>
                    <option value="Student">Student</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={onChange}
                  required
                  className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="current-password"
                  value={confirmPassword}
                  onChange={onChange}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                  placeholder="Confirm Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-sky-600 py-2 px-4 text-sm font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-sky-500 group-hover:text-sky-400"
                    aria-hidden="true"
                  />
                </span>
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
