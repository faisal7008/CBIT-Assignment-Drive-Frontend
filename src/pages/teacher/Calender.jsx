import TeacherNavbar from "../../components/Teacher";
import { useSelector } from "react-redux";

export default function TeacherCalender() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
       <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Calendar
            </h1>
          </div>
        </header>
      <main className="min-h-screen">
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div className="px-4 py-6 sm:px-0"></div>
          {/* /End replace */}
        </div>
      </main>
    </>
  );
}
