import React, { useEffect, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import { FaArrowAltCircleUp, FaPen, FaTrash } from "react-icons/fa";
import { useRouter } from "next/router";

const PrincipleDashboard = () => {
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);
    }
  }, []);

  const handleUpdateClick = (studentId) => {
    router.push(`/components/Dashboard/dComponents/student/${studentId}`);
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://pomkara-high-school-server.vercel.app/students/search/${searchKey}`
      );
      //console.log(searchKey);

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
        setLoading(false);
      } else {
        setLoading(false);
        alert("No students match with your search");
        setSearchResults([]);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching students:", error);
      alert("An error occurred while searching.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center mt-10 mb-3 bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto text-center sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold  mb-4">
            Welcome to Your Dashboard!
          </h1>
          <p className=" mb-4 sm:mb-6">
            Manage all the features of the Pomkara Siddikur Rahman & Hakim High
            School website from here.
          </p>
          <label className="block  font-medium mb-2">
            Search student by name or role
          </label>
          <div className="flex flex-col sm:flex-row items-center sm:justify-center">
            <input
              type="text"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              placeholder="Enter search term"
              className="border border-gray-300 rounded px-3 py-2 mb-3 sm:mb-0 sm:mr-2 w-full sm:w-auto"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded w-full sm:w-auto"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      {loading && (
        <>
          <div className="mt-5 text-center">
            <span className="loading loading-spinner text-primary"></span>
            <span className="loading loading-spinner text-secondary"></span>
            <span className="loading loading-spinner text-accent"></span>
            <span className="loading loading-spinner text-neutral"></span>
            <span className="loading loading-spinner text-info"></span>
            <span className="loading loading-spinner text-success"></span>
            <span className="loading loading-spinner text-warning"></span>
            <span className="loading loading-spinner text-error"></span>
          </div>
        </>
      )}
      {searchResults.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-green-500">
            <thead>
              <tr className="bg-green-500 text-white">
                <th className="border border-green-500 px-4 py-2">Name</th>
                <th className="border border-green-500 px-4 py-2">Class</th>
                <th className="border border-green-500 px-4 py-2">
                  Class Role
                </th>
                <th className="border border-green-500 px-4 py-2">
                  Due Payment
                </th>
                <th className="border border-green-500 px-4 py-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((student) => (
                <tr key={student._id} className="hover:bg-green-100">
                  <td className="border border-green-500 px-1 py-2 text-center">
                    {student.name}
                  </td>
                  <td className="border border-green-500 px-1 py-2 text-center">
                    {student.class}
                  </td>
                  <td className="border border-green-500 px-1 py-2 text-center">
                    {student.class_role}
                  </td>
                  <td className="border border-green-500 px-1 py-2 text-center">
                    {(
                      student.due_payment.reduce((acc, curr) => {
                        const amount = parseFloat(curr.amount) || 0;
                        return acc + amount;
                      }, 0) -
                      student.paid_payment.reduce((acc, curr) => {
                        const amount = parseFloat(curr.amount) || 0;
                        return acc + amount;
                      }, 0)
                    ).toFixed(2)}
                  </td>
                  <td className="border border-green-500 px-1 py-2 text-center text-green-600">
                    <button
                      onClick={() => handleUpdateClick(student._id)}
                      className="btn btn-outline text-green-500 px-5"
                    >
                      <FaPen />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PrincipleDashboard;

PrincipleDashboard.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
