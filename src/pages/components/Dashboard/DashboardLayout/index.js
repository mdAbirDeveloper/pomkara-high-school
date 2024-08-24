import Link from "next/link";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const DashboardLayout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const offMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="max-w-[1200px] mx-auto min-h-screen">
      <div className="md:flex block">
        <div className="w-52 shadow-md p-2 min-h-screen hidden md:block">
          <ul>
            <li className="text-white text-lg mr-2 uppercase font-serif bg-green-500 text-center mb-2 p-3">
              <Link href={"/components/Dashboard/dComponents/teacher"}>
                Teacher
              </Link>
            </li>
            <li className="text-white text-lg mr-2 uppercase font-serif bg-green-500 text-center mb-2 p-3">
              <Link href={"/components/Dashboard/dComponents/faculty"}>
                Faculty
              </Link>
            </li>
            <li className="text-white text-lg mr-2 uppercase font-serif bg-green-500 text-center mb-2 p-3">
              <Link href={"/components/Dashboard/dComponents/student"}>
                All student
              </Link>
            </li>
            <li className="text-white text-lg mr-2 uppercase font-serif bg-green-500 text-center mb-2 p-3">
              <Link
                href={"/components/Dashboard/dComponents/student/addStudent"}
              >
                Add student
              </Link>
            </li>
            <li className="text-white text-lg mr-2 uppercase font-serif bg-green-500 text-center mb-2 p-3">
              <Link href={"/components/Dashboard/dComponents/notice"}>
                notice
              </Link>
            </li>
            <li className="text-white text-lg mr-2 uppercase font-serif bg-green-500 text-center mb-2 p-3">
              <Link href={"/components/Dashboard/dComponents/result"}>
                result
              </Link>
            </li>
            <li className="text-white text-lg mr-2 uppercase font-serif bg-green-500 text-center mb-2 p-3">
              <Link href={"/components/Dashboard/dComponents/addMoney"}>
                Add Money
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-full md:hidden block">
          <button onClick={toggleMenu}>
            {menuOpen ? (
              <FaTimes className="text-3xl" />
            ) : (
              <FaBars className="text-3xl" />
            )}
          </button>
          {menuOpen && (
            <ul className="shadow-md p-2">
              <Link href={"/components/Dashboard/dComponents/teacher"}>
                <li
                  onClick={offMenu}
                  className="text-white text-lg mr-2 uppercase font-serif bg-green-500 text-center mb-2 p-3"
                >
                  Teacher
                </li>
              </Link>
              <Link href={"/components/Dashboard/dComponents/faculty"}>
                <li
                  onClick={offMenu}
                  className="text-white text-lg mr-2 uppercase font-serif bg-green-500 text-center mb-2 p-3"
                >
                  Faculty
                </li>
              </Link>
              <Link href={"/components/Dashboard/dComponents/student"}>
                <li
                  onClick={offMenu}
                  className="text-white text-lg mr-2 uppercase font-serif bg-green-500 text-center mb-2 p-3"
                >
                  All student
                </li>
              </Link>
              <Link
                href={"/components/Dashboard/dComponents/student/addStudent"}
              >
                <li
                  onClick={offMenu}
                  className="text-white text-lg mr-2 uppercase font-serif bg-green-500 text-center mb-2 p-3"
                >
                  Add Student
                </li>
              </Link>
              <Link href={"/components/Dashboard/dComponents/notice"}>
                <li
                  onClick={offMenu}
                  className="text-white text-lg mr-2 uppercase font-serif bg-green-500 text-center mb-2 p-3"
                >
                  notice
                </li>
              </Link>
              <Link href={"/components/Dashboard/dComponents/result"}>
                <li
                  onClick={offMenu}
                  className="text-white text-lg mr-2 uppercase font-serif bg-green-500 text-center mb-2 p-3"
                >
                  result
                </li>
              </Link>
              <Link href={"/components/Dashboard/dComponents/addMoney"}>
                <li
                  onClick={offMenu}
                  className="text-white text-lg mr-2 uppercase font-serif bg-green-500 text-center mb-2 p-3"
                >
                  Add Money
                </li>
              </Link>
            </ul>
          )}
        </div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
