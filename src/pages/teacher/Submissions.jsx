import React from "react";

export default function Submissions(props) {
  const { submissions } = props;
  return (
    <>
      <div class="overflow-x-auto mt-4 relative shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" class="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                Roll No
              </th>
              <th scope="col" class="py-3 px-6">
                Student Name
              </th>
              <th scope="col" class="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                Submitted Answer
              </th>
              <th scope="col" class="py-3 px-6">
                Allot Marks
              </th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((stud) => (
              <tr
                key={stud._id}
                class="border-b border-gray-200 dark:border-gray-700"
              >
                <th
                  scope="row"
                  class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                >
                  {stud.rollno}
                </th>
                <td class="py-4 px-6">{stud.name}</td>
                <td class="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                  <a
                    className=" font-semibold text-sky-600"
                    target={"_blank"}
                    href={stud.answer}
                  >
                    {stud.rollno + "_" + stud.name + "_answer"}
                  </a>
                </td>
                <td class="py-4 px-6">{stud.allotedmarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
