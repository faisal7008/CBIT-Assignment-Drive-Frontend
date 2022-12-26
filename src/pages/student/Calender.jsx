import React from "react";

import { Chart } from "react-google-charts";

export const data = [
  [
    { type: "date", id: "Date" },
    { type: "number", id: "Won/Loss" },
  ],
  [new Date(2013, 2, 4), 10],
  [new Date(2013, 2, 5), 3],
  [new Date(2013, 2, 7), -1],
  [new Date(2013, 2, 8), 2],
  [new Date(2013, 2, 12), -1],
  [new Date(2013, 2, 13), 1],
  [new Date(2013, 2, 15), 1],
  [new Date(2013, 2, 16), -4],
  [new Date(2013, 1, 4), 10],
  [new Date(2013, 1, 5), 3],
  [new Date(2013, 1, 7), -1],
  [new Date(2013, 1, 8), 2],
  [new Date(2013, 1, 12), -1],
  [new Date(2013, 1, 13), 1],
  [new Date(2013, 1, 15), 1],
  [new Date(2013, 1, 16), -4],
];

export const options = {
  title: "Red Sox Attendance",
};

export default function StudentCalender() {
  return (
    <div>
       <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Calendar
            </h1>
          </div>
        </header>
      <main className="min-h-screen">
      <div className="mx-auto max-w-7xl py-2 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div className="px-4 py-6 sm:px-0">
          <Chart
      chartType="Calendar"
      width="100%"
      height="100%"
      data={data}
      options={options}
    />
          </div>
          {/* /End replace */}
        </div>
      </main>
    </div>
  );
}

