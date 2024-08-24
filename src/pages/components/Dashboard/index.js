import React from "react";
import Link from "next/link";
import DashboardLayout from "./DashboardLayout";

const PrincipleDashboard = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to Your Dashboard!
        </h1>
        <p className="text-gray-600 mb-6">
          This is the main hub where you can manage all the features of the
          Pomkara Siddikur Rahman & Hakim High School website.
        </p>
        <button className="bg-green-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-green-600 transition-all">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default PrincipleDashboard;

PrincipleDashboard.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
