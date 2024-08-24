import React, { useContext, useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { AuthContext } from "@/pages/Authentication";
import { useDispatch, useSelector } from "react-redux";
import { setStudent } from "@/pages/Redux/features/studentSlice";
import { logout } from "@/pages/Redux/features/authSlice";
import { useRouter } from "next/router";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const [userFromDb, setUserFromDb] = useState(null);
  const [studentFromDb, setStudentFromDb] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  // const [student, setStudent] = useState(null)
  // Access the user data from Redux
  const { user, signOutUser } = useContext(AuthContext);
  const student = useSelector((state) => state.student);

  const router = useRouter();
  const handleLogout = () => {
    signOutUser();
    setUserFromDb(null); // Trigger re-render
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleStudentLogout = () => {
    dispatch(logout());
    localStorage.removeItem("student");
    router.reload();
    router.push("/components/studentLogin"); // Redirect to login page after logout
  };

  console.log(userFromDb?.name);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = JSON.parse(localStorage.getItem("user"));
      setUserFromDb(userData);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const studentData = JSON.parse(localStorage.getItem("student"));
      setStudentFromDb(studentData);
    }
  }, []);

  return (
    <div>
      <div
        style={{ maxWidth: "1500px" }}
        className="mx-auto h-20 bg-base-100 rounded shadow-2xl"
      >
        <div className="flex justify-between items-center pt-5">
          <div>
            <Image
              alt=""
              width={80}
              height={40}
              src={"/logo.png"}
              className="ml-4 rounded-2xl -mt-2"
              title="This is AV Technology logo"
            />
          </div>
          <div className="hidden md:flex text-sm">
            <Link
              href="/"
              className="bg-blue-500 text-white uppercase font-serif py-2 px-6 mr-2 rounded hover:bg-blue-600 transition-all"
            >
              Home
            </Link>
            <div className="relative">
              {/* Dropdown Toggle */}
              <button
                onClick={toggleDropdown}
                className="bg-blue-500 text-white uppercase font-serif py-2 px-6 mr-2 rounded hover:bg-blue-600 transition-all"
              >
                More
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute mt-2 bg-white shadow-lg rounded w-48">
                  <Link
                    onClick={toggleDropdown}
                    href="/components/faculty"
                    className="block px-4 py-2 text-white font-bold text-center mb-1 bg-green-400 transition-all"
                  >
                    Faculty
                  </Link>
                  <Link
                    onClick={toggleDropdown}
                    href="/components/teacher"
                    className="block px-4 py-2 text-white font-bold text-center mb-1 bg-green-400 transition-all"
                  >
                    Teacher
                  </Link>
                  <Link
                    onClick={toggleDropdown}
                    href="/components/about"
                    className="block px-4 py-2 text-white font-bold text-center mb-1 bg-green-400 transition-all"
                  >
                    About
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/components/notice"
              className="bg-blue-500 text-white uppercase font-serif py-2 px-6 mr-2 rounded hover:bg-blue-600 transition-all"
            >
              Notice
            </Link>
            <Link
              href="/components/result"
              className="bg-blue-500 text-white uppercase font-serif py-2 px-6 mr-2 rounded hover:bg-blue-600 transition-all"
            >
              Result
            </Link>
            <Link
              href="/components/contact"
              className="bg-blue-500 text-white uppercase font-serif py-2 px-6 mr-2 rounded hover:bg-blue-600 transition-all"
            >
              Contact
            </Link>
            {studentFromDb ? (
              <>
              <Link
              href="/components/profile"
              className="bg-green-500 text-white uppercase font-serif py-2 px-6 mr-2 rounded hover:bg-blue-600 transition-all"
            >
              profile
            </Link>
              <button
                onClick={handleStudentLogout}
                className="bg-red-500 mr-2 text-white uppercase font-serif py-2 px-6 rounded hover:bg-red-600 transition-all"
              >
                Logout Student
              </button></>
            ) : (
              <Link
                href="/components/studentLogin"
                className="bg-green-500 text-white uppercase font-serif py-2 px-6 mr-2 rounded hover:bg-blue-600 transition-all"
              >
                Student_Login
              </Link>
            )}
            {userFromDb?.isApprove == true && (
              <>
                <Link
                  href="/components/Dashboard"
                  className="bg-green-500 text-white uppercase font-serif py-2 px-6 mr-2 rounded hover:bg-blue-600 transition-all"
                >
                  Dashboard
                </Link>
              </>
            )}
          </div>
          <div className="hidden md:block mr-4">
            {user?.uid ? (
              <>
                <Link
                  onClick={() => {
                    signOutUser(), handleLogout();
                  }}
                  href="/"
                  className="bg-green-500 text-white py-2 px-6 font-serif rounded flex items-center hover:bg-green-600 transition-all"
                >
                  SignOut
                </Link>
              </>
            ) : (
              <Link
                href="/components/login"
                onClick={toggleMenu}
                className="block bg-green-500 text-white py-2 px-2 w-full mb-2 rounded hover:bg-blue-600 transition-all text-center"
              >
                Teacher Login
              </Link>
            )}
          </div>
          <div className="md:hidden flex items-center mr-4">
            <button onClick={toggleMenu}>
              {menuOpen ? (
                <FaTimes className="text-3xl" />
              ) : (
                <FaBars className="text-3xl" />
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden lg:hidden mt-4 px-4 bg-gray-400 absolute w-full">
            <Link
              href="/"
              onClick={toggleMenu}
              className="block bg-blue-500 text-white py-2 w-full mb-2 rounded hover:bg-blue-600 transition-all text-center"
            >
              Home
            </Link>
            <Link
              href="/components/teacher"
              onClick={toggleMenu}
              className="block bg-blue-500 text-white py-2 w-full mb-2 rounded hover:bg-blue-600 transition-all text-center"
            >
              Teacher
            </Link>
            <Link
              href="/components/faculty"
              onClick={toggleMenu}
              className="block bg-blue-500 text-white py-2 w-full mb-2 rounded hover:bg-blue-600 transition-all text-center"
            >
              Faculty
            </Link>
            <Link
              href="/components/about"
              onClick={toggleMenu}
              className="block bg-blue-500 text-white py-2 w-full mb-2 rounded hover:bg-blue-600 transition-all text-center"
            >
              About
            </Link>
            <Link
              href="/components/notice"
              onClick={toggleMenu}
              className="block bg-blue-500 text-white py-2 w-full mb-2 rounded hover:bg-blue-600 transition-all text-center"
            >
              Notice
            </Link>
            <Link
              href="/components/result"
              onClick={toggleMenu}
              className="block bg-blue-500 text-white py-2 w-full mb-2 rounded hover:bg-blue-600 transition-all text-center"
            >
              Result
            </Link>
            <Link
              href="/components/contact"
              onClick={toggleMenu}
              className="block bg-blue-500 text-white py-2 w-full mb-2 rounded hover:bg-blue-600 transition-all text-center"
            >
              Contact
            </Link>
            {studentFromDb ? (
              <>
              <Link
              href="/components/profile"
              className="block bg-green-500 text-white py-2 w-full mb-2 rounded hover:bg-blue-600 transition-all text-center"
            >
              profile
            </Link>
              <button
                onClick={() => {handleStudentLogout(), toggleMenu()}}
                className="bg-red-500 block  text-white py-2 w-full mb-2 rounded hover:bg-blue-600 transition-all text-center"
              >
                Logout Student
              </button></>
            ) : (
              <Link
                onClick={toggleMenu}
                href="/components/studentLogin"
                className="block bg-green-500 text-white py-2 w-full mb-2 rounded hover:bg-blue-600 transition-all text-center"
              >
                Student_Login
              </Link>
            )}

            {user && (
              <>
                <Link
                  href="/components/Dashboard"
                  onClick={toggleMenu}
                  className="block bg-blue-500 text-white py-2 w-full mb-2 rounded hover:bg-blue-600 transition-all text-center"
                >
                  Dashboard
                </Link>
              </>
            )}

            {user?.uid ? (
              <>
                <Link
                  onClick={() => {
                    signOutUser(), toggleMenu();
                  }}
                  href="/"
                  className="block bg-green-500 text-white py-2 w-full mb-2 rounded hover:bg-blue-600 transition-all text-center"
                >
                  SignOut
                </Link>
              </>
            ) : (
              <Link
                href="/components/login"
                onClick={toggleMenu}
                className="block bg-green-500 text-white py-2 w-full mb-2 rounded hover:bg-blue-600 transition-all text-center"
              >
                Teacher Login
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
