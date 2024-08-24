import React, { useEffect, useState } from "react";
import DashboardLayout from "../../DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  approveTeacher,
  deleteTeacher,
  fetchTeacherData,
  unapproveTeacher,
} from "@/pages/Redux/api/teacher";
import { FaTrash } from "react-icons/fa";

const Teacher = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const { teachers, loading, error } = useSelector((state) => state.teacher);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);
    }
  }, []);

  useEffect(() => {
    dispatch(fetchTeacherData());
  }, [dispatch]);

  const handleApprove = async (teacherId) => {
    try {
      dispatch(approveTeacher(teacherId)); // Approve the teacher and refresh the list
      dispatch(fetchTeacherData());
      dispatch(fetchTeacherData());
    } catch (error) {
      console.error("Error approving teacher:", error);
    }
  };

  const handleUnApprove = async (teacherId) => {
    try {
      dispatch(unapproveTeacher(teacherId)); // Approve the teacher and refresh the list
      dispatch(fetchTeacherData());
    } catch (error) {
      console.error("Error approving teacher:", error);
    }
  };

  const handleDelete = async (teacherId) =>{
    dispatch(deleteTeacher(teacherId))
    dispatch(fetchTeacherData())
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!user) {
    return <div  className="text-center mt-4 text-2xl text-red-500 font-serif">Please login first.</div>;
  } else if (user?.role !== "principle") {
    return <div  className="text-center mt-4 text-2xl text-red-500 font-serif">This section is for the principal only.</div>;
  } else if (user?.isApprove === false) {
    return <div  className="text-center mt-4 text-2xl text-red-500 font-serif">Only approved principals can see this section.</div>;
  }

  const unapprovedTeachers = teachers.filter((teacher) => !teacher.isApprove);
  const approvedTeachers = teachers.filter(
    (teacher) => teacher.isApprove == true
  );

  return (
    <div className="m-10">
      <div>
  {unapprovedTeachers.length > 0 && (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="text-left">
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Uploaded At</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Actions</th>
            <th className="py-2 px-4 border-b"></th> 
          </tr>
        </thead>
        <tbody>
          {unapprovedTeachers.map((teacher) => (
            <tr key={teacher._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b bg-gray-50">{teacher.name}</td>
              <td className="py-2 px-4 border-b bg-gray-100">{teacher.email}</td>
              <td className="py-2 px-4 border-b bg-gray-200">{new Date(teacher.uploatedTime).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">{teacher.role}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleApprove(teacher._id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                >
                  Approve
                </button>
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleDelete(teacher._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>

<div className="mt-20">
  {approvedTeachers.length > 0 && (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="text-left">
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Uploaded At</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Actions</th>
            <th className="py-2 px-4 border-b"></th> 
          </tr>
        </thead>
        <tbody>
          {approvedTeachers.map((teacher) => (
            <tr key={teacher._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b bg-gray-50">{teacher.name}</td>
              <td className="py-2 px-4 border-b bg-gray-100">{teacher.email}</td>
              <td className="py-2 px-4 border-b bg-gray-200">{new Date(teacher.uploatedTime).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">{teacher.role}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleUnApprove(teacher._id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                >
                  UnApprove
                </button>
              </td>
              <td className="py-2 px-4 border-b"></td> 
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>

    </div>
  );
};

export default Teacher;

Teacher.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
