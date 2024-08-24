/* eslint-disable react-hooks/rules-of-hooks */
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  fetchUserFailure,
  fetchUserStart,
  fetchUserSuccess,
} from "../../../../Redux/features/userSlice";
import { AuthContext } from "@/pages/Authentication";
import { useRouter } from "next/router";
import Head from "next/head";

const Login = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { loginUser, user, signOutUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    setLoading(true);
    setError("");
    dispatch(fetchUserStart()); // Start loading state

    try {
      const response = await fetch(
        `https://pomkara-high-school-server.vercel.app/user/login?email=${encodeURIComponent(email)}`
      );
      const userData = await response.json();
      
      if (userData.message === "User not found") {
        setError("There is no account with this email");
        setLoading(false);
        return;
      }

      if (userData.isApprove === true) {
        try {
          const user = await loginUser(email, password);
          localStorage.setItem("user", JSON.stringify(userData));
          dispatch(fetchUserSuccess(userData)); // Store user data in Redux
          setLoading(false);
          // Trigger a page reload to reflect changes
          router.reload(); // This forces a full page reload
        } catch (error) {
          setError("Login error: " + error.message);
          setLoading(false);
          console.error("Login error:", error);
        }
      } else {
        setLoading(false);
        setError("Your account has not been approved yet.");
      }
    } catch (error) {
      setError("Error fetching user data: " + error.message);
      dispatch(fetchUserFailure(error.message));
      setLoading(false);
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div>
      <Head>
        <title>Login | Pomkara Siddikur Rahman & Hakim High School</title>
        <meta name="description" content="Access your account at Pomkara Siddikur Rahman & Hakim High School. Log in to manage your profile, check grades, and access school resources." />
        <meta name="keywords" content="login, Pomkara Siddikur Rahman & Hakim High School, student portal, access, account" />
        <meta property="og:title" content="Login - Pomkara Siddikur Rahman & Hakim High School" />
        <meta property="og:description" content="Log in to your account at Pomkara Siddikur Rahman & Hakim High School to access your profile, grades, and other resources." />
        <meta property="og:image" content="[URL to an image related to login or the school]" />
        <meta property="og:url" content="https://pomkara-high-school.netlify.app/components/login" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Login - Pomkara Siddikur Rahman & Hakim High School" />
        <meta name="twitter:description" content="Access your Pomkara Siddikur Rahman & Hakim High School account. Manage your profile, view grades, and access school resources." />
        <meta name="twitter:image" content="[URL to an image related to login or the school]" />
      </Head>
      <div className="max-w-[1400px] mx-auto">
        <div className="md:w-1/4 w-full mx-auto md:mt-40 mt-20">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="shadow-xl shadow-green-400 hover:shadow-2xl hover:shadow-green-600 rounded-xl p-5"
          >
            <div>
              <input
                className="input input-bordered border-green-500 mb-5 w-full"
                {...register("email")}
                required
                placeholder="Enter your Email"
                name="email"
              />
            </div>
            <div>
              <input
                className="input input-bordered border-green-500 mb-5 w-full"
                {...register("password")}
                required
                placeholder="Enter your Password"
                name="password"
                type="password"
              />
            </div>
            <div>
              <p className="text-red-400">{error}</p>
            </div>
            {user?.uid ? (
              <>
                <p
                  onClick={signOutUser}
                  className="btn btn-outline uppercase font-serif border-green-500 mb-5 w-full"
                >
                  Please logout first then come to login
                </p>
              </>
            ) : (
              <>
                {loading ? (
                  <button
                    className="btn btn-outline uppercase font-serif border-green-500 mb-5 w-full"
                    disabled
                  >
                    <span className="loading loading-spinner text-primary"></span>
                    <span className="loading loading-spinner text-secondary"></span>
                    <span className="loading loading-spinner text-accent"></span>
                  </button>
                ) : (
                  <input
                    type="submit"
                    value={"Login"}
                    className="btn btn-outline uppercase font-serif border-green-500 mb-5 w-full"
                  />
                )}
              </>
            )}
            <div>
              <p>
                {"Don't have an account?"}{" "}
                <Link className="text-blue-400" href={"/components/signUp"}>
                  SignUp
                </Link>{" "}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
