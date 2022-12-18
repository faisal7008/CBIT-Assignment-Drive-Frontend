import StudentNavbar from "../../components/Student";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Tabs } from "flowbite-react";
import { getCourses } from "../../features/courses/courseSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getSubmissions } from "../../features/submissions/submissionSlice";
import PendingAssignments from "../../components/Student/PendingAssignments";
import SubmittedAssignments from "../../components/Student/SubmittedAssignments";
import FinishedAssignments from "../../components/Student/FinishedAssignments";

export default function StudentSubmissions() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { submissions, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.submissions
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    dispatch(getCourses());
    dispatch(getSubmissions());
  }, [user, navigate, dispatch]);


  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Submissions
          </h1>
        </div>
      </header>

      <main className="min-h-screen">
        <div className="alerts absolute w-5/6 md:w-2/6 -mt-16 left-1/3">
          {/* {isError && <AlertContainer />} */}
        </div>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-3 sm:px-0">
            <Tabs.Group aria-label="tabs with underline" style="underline">
              <Tabs.Item title="Pending Assignments" 
              onClick={() => navigate()}
              >
                <PendingAssignments submissions={submissions}/>
              </Tabs.Item>
              <Tabs.Item
                title="Submitted Assignments"
                onClick={() => navigate()}
              >
                <SubmittedAssignments submissions={submissions}/>
              </Tabs.Item>
              <Tabs.Item
                title="Finished Assignments"
                onClick={() => navigate()}
              >
                <FinishedAssignments submissions={submissions}/>
              </Tabs.Item>
            </Tabs.Group>
          </div>
        </div>
      </main>
    </>
  );
}
