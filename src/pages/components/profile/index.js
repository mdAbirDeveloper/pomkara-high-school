import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Profile = () => {
  const [student, setStudent] = useState(null);
  const [showModal, setShowModal] = useState(false); // For handling modal visibility
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const studentData = JSON.parse(localStorage.getItem("student"));
      setStudent(studentData);
    }
  }, []);

  const id = student?._id;

  useEffect(() => {
    if (id) {
      const fetchStudent = async () => {
        try {
          const response = await fetch(`http://localhost:5000/students/${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch student details");
          }
          const data = await response.json();
          setStudent(data);
        } catch (error) {
          console.error("Error fetching student details:", error);
        }
      };

      fetchStudent();
    }
  }, [id]);

  const all_due_payment = student?.due_payment;
  const reversedDuePayments =
    all_due_payment?.length > 0 ? all_due_payment.slice().reverse() : [];

  const all_paid_payment = student?.paid_payment;
  const reversedPaidPayments =
    all_paid_payment?.length > 0 ? all_paid_payment.slice().reverse() : [];

  const calculateDueTotal = (payments) => {
    return payments.reduce((acc, payment) => acc + Number(payment.amount), 0);
  };

  const calculatePaidTotal = (payments) => {
    return payments.reduce((acc, payment) => acc + Number(payment.amount), 0);
  };

  const totalDueAmount = student?.due_payment
    ? calculateDueTotal(student.due_payment)
    : 0;

  const totalPaidAmount = student?.paid_payment
    ? calculatePaidTotal(student.paid_payment)
    : 0;

  const totalAmount = totalDueAmount - totalPaidAmount;

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/students/changePassword/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
          }),
        }
      );

      if (!response.ok) {
        setLoading(false);
        throw new Error("Failed to change password");
      }

      const result = await response.json();
      setLoading(false);
      router.reload();
      alert(result.message || "Password changed successfully");
      reset();
      setShowModal(false);
    } catch (error) {
      setLoading(false);
      console.error("Error changing password:", error);
      alert("Error changing password. Please try again.");
    }
  };

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-4">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
          <p className="text-2xl font-serif text-red-500 mb-4">
            You cannot see anything on this page after sign out
          </p>
          <p className="text-gray-700 mb-4">Please go back to the home page.</p>
          <Link
            href="/"
            className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg font-medium text-lg hover:bg-blue-600 transition"
          >
            Home
          </Link>
          <p className="text-gray-700 mb-4 mt-3">Or Login again.</p>
          <Link
            href="/components/studentLogin"
            className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg font-medium text-lg hover:bg-blue-600 transition"
          >
            LogIn
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-500 text-white text-center p-4">
            <h2 className="text-xl font-bold">Name: {student.name}</h2>
            <p className="text-sm">
              password: {student.password || "No Password Provided"}
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-red-600 transition"
            >
              Change Password
            </button>
          </div>
          {/* Modal for changing password */}
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h3 className="text-lg font-bold mb-4">Change Password</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4">
                    <div className="relative w-full">
                      <input
                        className="input input-bordered border-green-500 mb-5 w-full pr-10" // Added padding to the right for the icon
                        {...register("oldPassword")}
                        required
                        placeholder="Enter your Old Password"
                        name="oldPassword"
                        type={showPassword ? "text" : "password"} // Toggle input type
                      />
                      <div
                        className="absolute inset-y-0 right-3 flex items-center cursor-pointer mb-4"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </div>
                    </div>
                  </div>
                  <div className="relative w-full">
                    <input
                      className="input input-bordered border-green-500 mb-5 w-full pr-10" // Added padding to the right for the icon
                      {...register("newPassword")}
                      required
                      placeholder="Enter your New Password"
                      name="newPassword"
                      type={showPassword ? "text" : "password"} // Toggle input type
                    />
                    <div
                      className="absolute inset-y-0 right-3 flex items-center cursor-pointer mb-4"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-600 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                      {loading ? "changing" : "change"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Student Details
          </h2>
          <table className="md:w-1/3 w-full mx-auto border divide-gray-200">
            <tbody className=" divide-gray-200">
              <tr>
                <td className="px-6 py-3 font-semibold text-gray-600">Class</td>
                <td className="px-6 py-3 text-gray-800">{student?.class}</td>
              </tr>
              <tr>
                <td className="px-6 py-3 font-semibold text-gray-600">
                  Class Role
                </td>
                <td className="px-6 py-3 text-gray-800">
                  {student?.class_role}
                </td>
              </tr>
              <tr>
                <td className="px-6 py-3 font-semibold text-gray-600">
                  Number
                </td>
                <td className="px-6 py-3 text-gray-800">{student?.number}</td>
              </tr>
              <tr>
                <td className="px-6 py-3 font-semibold text-gray-600">
                  Fathers Name
                </td>
                <td className="px-6 py-3 text-gray-800">
                  {student?.fathers_name}
                </td>
              </tr>
              <tr>
                <td className="px-6 py-3 font-semibold text-gray-600">
                  Fathers Number
                </td>
                <td className="px-6 py-3 text-gray-800">
                  {student?.fathers_number}
                </td>
              </tr>
              <tr>
                <td className="px-6 py-3 font-semibold text-gray-600">
                  Mothers Name
                </td>
                <td className="px-6 py-3 text-gray-800">
                  {student?.mothers_name}
                </td>
              </tr>
              <tr>
                <td className="px-6 py-3 font-semibold text-gray-600">
                  Mothers Number
                </td>
                <td className="px-6 py-3 text-gray-800">
                  {student?.mothers_number}
                </td>
              </tr>
              <tr>
                <td className="px-6 py-3 font-semibold text-gray-600">
                  Uploaded Time
                </td>
                <td className="px-6 py-3 text-gray-800">
                  {new Date(student?.uploadedTime).toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="px-6 py-3 font-semibold text-gray-600">
                  Creator
                </td>
                <td className="px-6 py-3 text-gray-800">
                  {student?.creator?.name}
                </td>
              </tr>
              
              <tr>
                <td className="px-6 py-3 font-semibold text-gray-600">
                  Total Due Payment
                </td>
                <td className="px-6 py-3 text-red-500 font-bold">
                  {totalAmount}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="max-w-[1000px] mx-auto">
          <div className="overflow-x-auto rounded-lg shadow-md mt-10">
            <h1 className="text-center md:text-2xl text-xl font-bold font-serif uppercase text-red-500">
              All Results
            </h1>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-green-400">
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-white border ">
                    Exam Type
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-white border ">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-white border">
                    Result
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-white border ">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-white border ">
                    Upload By
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {student?.result?.slice().reverse().map((results, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium border">
                      {results.examType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium border">
                      {results.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium border">
                      {results.result + " " + "/" + " " + results.mark}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium border">
                      {new Date(results.date).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium border">
                      {results.addedBy.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="overflow-x-auto rounded-lg shadow-md mt-10">
            <h1 className="text-center md:text-2xl text-xl font-bold font-serif uppercase text-red-500">
              Details about Due_payment
            </h1>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-yellow-400">
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-white border ">
                    Take
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-white border ">
                    Added For
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-white border">
                    Add By
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-white border ">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-white border  sm:table-cell">
                    Condition
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {reversedDuePayments?.map((payment, index) => (
                  <>
                    {payment.isPaid == false && (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium border">
                          {payment.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium border">
                          {payment.amountType}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium border">
                          {payment.addedBy?.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium border">
                          {new Date(payment.date).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-yellow-400 sm:table-cell">
                          Due
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>

          <div className="overflow-x-auto rounded-lg shadow-md mt-10">
            <h1 className="text-center md:text-2xl text-xl font-bold font-serif uppercase text-green-500">
              Details about Paid_payment
            </h1>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-green-400 text-white border">
                <tr>
                  <th className="px-6 py-3 text-left font-medium border">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left font-medium border">
                    For
                  </th>
                  <th className="px-6 py-3 text-left font-medium border">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left font-medium border sm:table-cell text-sm">
                    Accept By
                  </th>
                  <th className="px-6 py-3 text-left font-medium border">
                    Condition
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {reversedPaidPayments?.map((payment, index) => (
                  <>
                    {payment.isPaid == true && (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium border">
                          {new Date(payment.date).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium border">
                          {payment.amountType}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium border">
                          {payment.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium border">
                          {payment.addedBy?.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-400 sm:table-cell">
                          Paid
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
