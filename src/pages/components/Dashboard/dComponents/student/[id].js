import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DashboardLayout from "../../DashboardLayout";
import ReactModal from "react-modal";
import { FaDonate, FaEye } from "react-icons/fa";

const StudentDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [showDueModal, setShowDueModal] = useState(false);
  const [amount, setAmount] = useState(0);
  const [amountType, setAmountType] = useState("");
  const [examType, setExamType] = useState("");
  const [subject, setSubject] = useState("");
  const [result, setResult] = useState(0);
  const [mark, setFullMark] = useState(0);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);
    }
  }, []);

  const all_due_payment = student?.due_payment;
  const reversedDuePayments =
    all_due_payment?.length > 0 ? all_due_payment.slice().reverse() : [];

  const all_paid_payment = student?.paid_payment;
  const reversedPaidPayments =
    all_paid_payment?.length > 0 ? all_paid_payment.slice().reverse() : [];

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setAmount(0); // Reset amount after closing modal
    setAmountType("");
    setError(""); // Reset error after closing modal
  };

  const handleOpenResultModal = () => {
    setShowResultModal(true);
  };

  const handleCloseResultModal = () => {
    setShowResultModal(false);
    setAmount(0); // Reset amount after closing modal
    setAmountType("");
    setError(""); // Reset error after closing modal
  };

  const handleDueModalOpen = () => {
    setShowDueModal(true);
  };

  const handleDueModalClose = () => {
    setShowDueModal(false);
    setAmount(0); // Reset amount after closing modal
    setAmountType("");
    setError(""); // Reset error after closing modal
  };

  const handleAddAmount = async (studentId) => {
    setError("");
    const addedBy = {
      name: user.name,
      email: user.email,
    };

    try {
      const response = await fetch(
        `https://pomkara-high-school-server.vercel.app/students/addAmount/${studentId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount, amountType, addedBy }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        setError(data.error);
        throw new Error(data.error);
      }

      // Re-fetch student data after successful addition
      const updatedStudentResponse = await fetch(
        `https://pomkara-high-school-server.vercel.app/students/${id}`
      );
      if (!updatedStudentResponse.ok) {
        throw new Error("Failed to fetch updated student details");
      }
      const updatedStudent = await updatedStudentResponse.json();
      setStudent(updatedStudent);

      console.log("Amount added successfully:", updatedStudent);
      handleDueModalClose();
    } catch (error) {
      setError(error.message);
      console.error("Error adding amount:", error);
    }
  };

  const handleCutAmount = async (studentId) => {
    setError("");
    const cutedBy = {
      name: user.name,
      email: user.email,
    };

    try {
      const response = await fetch(
        `https://pomkara-high-school-server.vercel.app/students/cutAmount/${studentId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount, amountType, cutedBy }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        setError(data.error);
        throw new Error(data.error);
      }

      // Re-fetch student data after successful addition
      const updatedStudentResponse = await fetch(
        `https://pomkara-high-school-server.vercel.app/students/${id}`
      );
      if (!updatedStudentResponse.ok) {
        throw new Error("Failed to fetch updated student details");
      }
      const updatedStudent = await updatedStudentResponse.json();
      setStudent(updatedStudent);

      console.log("Amount cuted successfully:", updatedStudent);
      handleCloseModal();
    } catch (error) {
      setError(error.message);
      console.error("Error adding amount:", error);
    }
  };

  const handleResult = async (studentId) => {
    setError("");
    setLoading(true);
    setSuccess("");
    const addedBy = {
      name: user.name,
      email: user.email,
    };

    try {
      const response = await fetch(
        `https://pomkara-high-school-server.vercel.app/students/addResult/${studentId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ examType, subject, result, mark, addedBy }),
        }
      );
      if (!response.ok) {
        const data = await response.json();
        setLoading(false);
        setError(data.error);
        throw new Error(data.error);
      }

      // Re-fetch student data after successful addition
      const updatedStudentResponse = await fetch(
        `https://pomkara-high-school-server.vercel.app/students/${id}`
      );
      if (!updatedStudentResponse.ok) {
        setLoading(false);
        throw new Error("Failed to fetch updated student details");
      }
      const updatedStudent = await updatedStudentResponse.json();
      setStudent(updatedStudent);
      setLoading(false);
      setSuccess("Result added successfully");
      console.log("Result added successfully:", updatedStudent);
    } catch (err) {
      setLoading(false);
      setSuccess("");
      console.log("error", err);
    }
  };

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

  useEffect(() => {
    if (id) {
      const fetchStudent = async () => {
        try {
          const response = await fetch(
            `https://pomkara-high-school-server.vercel.app/students/${id}`
          );
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

  if (!student) {
    return (
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
    );
  }

  if (!["teacher", "principle", "faculty"].includes(user?.role)) {
    return (
      <div className="text-center mt-4 text-2xl text-red-500 font-serif">
        Please login first to see this section
      </div>
    );
  }

  return (
    <div>
      <div className=" mx-auto md:w-1/3 w-full p-3 shadow-lg rounded mt-5">
        <h1 className="text-4xl font-bold mb-4 text-green-500 text-center">
          Student Details
        </h1>
        <div className="flex flex-col ">
          <h1 className="text-2xl font-bold border text-left mt-0 py-3">
            Name: {student.name}
          </h1>
          <h3 className="font-bold font-serif text-md text-left border mt-0 py-3">
            Phone number: {student.number}
          </h3>
          <h3 className="font-bold font-serif text-md text-left border mt-0 py-3 text-red-400">
            Password: {student.password}
          </h3>
          <p className="font-bold font-serif text-md text-left border mt-0 py-3">
            Class: {student.class}
          </p>
          <p className="font-bold font-serif text-md text-left border mt-0 py-3">
            Class Role: {student.class_role}
          </p>
          <p
            className={`font-bold font-serif text-md text-left border mt-0 py-3 ${
              totalAmount > 1000 ? "text-red-500" : "text-green-500"
            }`}
          >
            due_payment: {totalAmount} Taka
          </p>

          <p className="font-bold font-serif text-md text-left border mt-0 py-3 ">
            Fathers Name: {student.fathers_name}
          </p>
          <p className="font-bold font-serif text-md text-left border mt-0 py-3">
            Fathers Number: {student.fathers_number}
          </p>
          <p className="font-bold font-serif text-md text-left border mt-0 py-3">
            Mothers Name: {student.mothers_name}
          </p>
          <p className="font-bold font-serif text-md text-left border mt-0 py-3">
            Mothers Number: {student.mothers_number}
          </p>
          <p className="font-bold font-serif text-red-400 text-md text-left border mt-0 py-3">
            Previous Years Due: {student.last_year_due}
          </p>
        </div>
        <div className="flex justify-between">
          {["teacher", "principle"].includes(user?.role) && (
            <>
              <button
                className="btn btn-success px-4 mt-2 rounded-none text-white"
                onClick={() =>
                  router.push(
                    `/components/Dashboard/dComponents/student/update/${student._id}`
                  )
                }
              >
                Update
              </button>
              <div>
                <button
                  className="btn btn-info rounded-none text-white px-4 mt-2"
                  onClick={handleDueModalOpen}
                >
                  Add Amount
                </button>

                <div className="">
                  <ReactModal
                    isOpen={showDueModal}
                    onRequestClose={handleDueModalClose}
                    className="md:w-2/4 mx-auto bg-green-900 p-10 "
                  >
                    {/* Modal content */}
                    <div className="text-center block">
                      <form>
                        <div>
                          <select
                            className="w-full text-2xl mb-3"
                            onChange={(e) => {
                              setAmountType(e.target.value);
                            }}
                          >
                            {/* Options for amount types */}
                            <option disabled selected>
                              Select one
                            </option>
                            <option value="monthly_fee">Monthly Fee</option>
                            <option value="exam_fee">Exam Fee</option>
                            <option value="session_fee">Session Fee</option>
                            <option value="scout_fee">Scout Fee</option>
                            <option value="electricity_fee">
                              Electricity Fee
                            </option>
                            <option value="fine">Fine</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div>
                          <input
                            type="number"
                            className="w-full text-2xl"
                            onChange={(e) => setAmount(e.target.value)}
                          />
                        </div>
                      </form>
                      <p className="text-red-500">{error}</p>
                      <div className="flex justify-between">
                        <button
                          className="btn btn-success mt-3 px-9"
                          onClick={() => handleAddAmount(student._id)}
                        >
                          Submit
                        </button>
                        <button
                          className="btn btn-warning mt-3 px-9"
                          onClick={handleDueModalClose}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </ReactModal>
                </div>
              </div>
            </>
          )}

          <div>
            {totalAmount > 0 && (
              <>
                <button
                  className="btn btn-warning text-white rounded-none px-4 mt-2"
                  onClick={handleOpenModal}
                >
                  Cut Amount
                </button>
              </>
            )}

            <div className="">
              <ReactModal
                isOpen={showModal}
                onRequestClose={handleCloseModal}
                className="md:w-2/4 mx-auto bg-slate-900 p-10 "
              >
                {/* Modal content */}
                <div className="text-center block">
                  <form>
                    <div>
                      <select
                        className="w-full text-2xl mb-3"
                        onChange={(e) => {
                          setAmountType(e.target.value);
                        }}
                      >
                        {/* Options for amount types */}
                        <option disabled selected>
                          Select one
                        </option>
                        <option value="monthly_fee">Monthly Fee</option>
                        <option value="exam_fee">Exam Fee</option>
                        <option value="session_fee">Session Fee</option>
                        <option value="scout_fee">Scout Fee</option>
                        <option value="electricity_fee">Electricity Fee</option>
                        <option value="fine">Fine</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <input
                        type="number"
                        className="w-full text-2xl"
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                  </form>
                  <p className="text-red-500">{error}</p>
                  <div className="flex justify-between">
                    <button
                      className="btn btn-success mt-3 px-9"
                      onClick={() => handleCutAmount(student._id)}
                    >
                      Submit
                    </button>
                    <button
                      className="btn btn-warning mt-3 px-9"
                      onClick={handleCloseModal}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </ReactModal>
            </div>
          </div>
          <div></div>
        </div>
        {["teacher", "principle"].includes(user?.role) && (
          <div className="text-center">
            <button
              className="btn btn-success text-white rounded-none px-4 mt-2"
              onClick={handleOpenResultModal}
            >
              Add Result
            </button>
            <ReactModal
              isOpen={showResultModal}
              onRequestClose={handleCloseResultModal}
              className="md:w-2/4 mx-auto bg-slate-900 p-10 "
            >
              {/* Modal content */}
              <div className="text-center block">
                <form>
                  <div>
                    <select
                      required
                      className="w-full text-2xl mb-3"
                      onChange={(e) => {
                        setExamType(e.target.value);
                      }}
                    >
                      {/* Options for amount types */}
                      <option disabled selected>
                        Select exam_Type one
                      </option>
                      <option value="Eeekly">weekly</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Half_Yearly">Half Yearly</option>
                      <option value="Annual">Annual</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <select
                      className="w-full text-2xl mb-3"
                      required
                      onChange={(e) => {
                        setSubject(e.target.value);
                      }}
                    >
                      {/* Options for amount types */}
                      <option disabled selected>
                        Select Subject
                      </option>
                      <option value="Bangla">Bangla</option>
                      <option value="English">English</option>
                      <option value="Math">Math</option>
                      <option value="Since">Since</option>
                    </select>
                  </div>
                  <div>
                    <input
                      className="w-full text-2xl mb-3"
                      placeholder="Enter the result"
                      onChange={(e) => {
                        const value = e.target.value;
                        // Check if the value is a number and between 0 and 100
                        if (
                          value === "" ||
                          (Number(value) >= 0 && Number(value) <= 100)
                        ) {
                          setResult(value);
                        } else {
                          alert("Please enter a value between 0 and 100");
                        }
                      }}
                    />
                  </div>
                  <div>
                    <input
                      className="w-full text-2xl mb-3"
                      placeholder="Enter the result"
                      // type="number"
                      onChange={(e) => {
                        const value = e.target.value;
                        // Check if the value is a number and between 0 and 100
                        if (
                          value === "" ||
                          (Number(value) >= 0 && Number(value) <= 100)
                        ) {
                          setFullMark(value);
                        } else {
                          alert("Please enter a value between 0 and 100");
                        }
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-white">{success}</p>
                  </div>
                </form>
                <p className="text-red-500">{error}</p>
                <div className="flex justify-between">
                  <button
                    className="btn btn-success mt-3 px-9"
                    onClick={() => handleResult(student._id)}
                  >
                    {loading ? "Result addeding...." : "Add Result"}
                  </button>
                  <button
                    className="btn btn-warning mt-3 px-9"
                    onClick={handleCloseResultModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </ReactModal>
          </div>
        )}
      </div>
      <div>
        <div className="overflow-x-auto rounded-lg shadow-md mt-10">
          <h1 className="text-center md:text-2xl text-xl font-bold font-serif uppercase text-red-500">
            Details about due_payment
          </h1>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-green-400">
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
                <th className="px-6 py-3 text-left font-medium border">Date</th>
                <th className="px-6 py-3 text-left font-medium border">For</th>
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
              {student?.result
                ?.slice()
                .reverse()
                .map((results, index) => (
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
      </div>
    </div>
  );
};

export default StudentDetails;

StudentDetails.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
