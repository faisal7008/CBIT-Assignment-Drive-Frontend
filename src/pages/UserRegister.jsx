import { useState, useEffect } from "react";
import { Alert, Spinner } from "flowbite-react";
import { LockClosedIcon, ArrowLeftCircleIcon } from "@heroicons/react/20/solid";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MainLogo from "../assets/main-logo.png";
import { addUser, reset } from "../features/users/userSlice";

export default function UserRegister() {
  const [formData, setFormData] = useState({
    name: "",
    id_no: "",
    email: "",
    role: "",
    isMentor: false,
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { name, id_no, email, role, isMentor, password, confirmPassword } = formData;

  // const { user } = useSelector((state) => state.auth);
  const { users, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    if (isError) {
      setError(message);
    }
  }, [isError, message]);

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
        isMentor,
        password,
      };
      // console.log(userData)
      dispatch(addUser(userData));
      setMsg("Account created successfully.")
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

  const SuccessContainer = () => {
    return (
      <Alert color="success">
        <span>
          <span className="font-medium">Success!</span> {msg} <Link className=" italic font-bold" to={'/login'}> Click to Login</Link>
        </span>
      </Alert>
    );
  };

  return (
    <>
      <Link onClick={() => navigate(-1)}>
        <ArrowLeftCircleIcon
          className="h-10 w-10 absolute m-4 text-sky-500 hover:text-sky-600 cursor-pointer"
          aria-hidden="true"
        />
      </Link>
      <div className="flex flex-col min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src={MainLogo}
              height={100}
              width={70}
            />
            <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-gray-900">
              Create a new account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <a href="/login" className="font-medium text-sky-600 hover:text-sky-500">
                Already Registered ?
              </a>
            </p>
          </div>
          {error ? <ErrorContainer /> : <></>}
          {msg ? <SuccessContainer /> : <></>}
          <form className="space-y-6" onSubmit={onSubmit}>
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
                    className="relative block  w-1/3 text-left appearance-none rounded-none border border-r-0 border-gray-300 px-3 py-2 text-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
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
                    className="relative block w-2/3 appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
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
               {role === "Teacher" && <div className="flex">
                  <button
                    className="relative block w-1/3 text-left appearance-none rounded-none border border-r-0 border-gray-300 px-3 py-2 text-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                    type="button"
                    disabled
                  >
                    Is a Mentor?
                  </button>
                  <label htmlFor="roles" className="sr-only">
                    Select an option
                  </label>
                  <select
                    id="isMentor"
                    className="relative block w-2/3 appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                    name="isMentor"
                    value={isMentor}
                    onChange={onChange}
                    required
                  >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </select>
                </div>}
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
                  <>Register</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
