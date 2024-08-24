import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowAltCircleDown, FaEye, FaEyeSlash } from "react-icons/fa";
import auth from "../../../../firebase";
import { AuthContext } from "@/pages/Authentication";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async ({ name, role, password, email, image, about, number }) => {
    setLoading(true);
    setError("");
    setSuccess("");

    const imageFile = image[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    const imgbbApiKey = "d1fbaa0b9f043f285b08e6d997b387ef"; // Replace with your API key
    const imgbbResponse = await fetch(
      `https://api.imgbb.com/1/upload?expiration=2592000&key=${imgbbApiKey}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const imgbbData = await imgbbResponse.json();
    console.log(imgbbData);

    if (!imgbbResponse.ok || !imgbbData.success) {
      throw new Error("Failed to upload image to imgbb");
    }

    const imageUrl = imgbbData.data.url;
    const userData = {
      name: name,
      role: role,
      password: password,
      email: email,
      number: number,
      about: about,
      image: imageUrl,
    };
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        fetch("https://pomkara-high-school-server.vercel.app/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
        const user = userCredential.user;
        setLoading(false);
        setSuccess(
          "requiest submited, after accept by authority you can login. please wait until acception"
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        setLoading(false);
      });
    console.log(name, role, email, password);
  };

  return (
    <div>
      <div className="max-w-[1400px] mx-auto">
        <div className="md:w-1/4 w-full mx-auto md:mt-40 mt-20">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="shadow-xl shadow-green-400 hover:shadow-2xl hover:shadow-green-600 rounded-xl p-5"
          >
            <div>
              <input
                className="input input-bordered border-green-500 mb-5 w-full"
                {...register("name")}
                required
                placeholder="Enter your Name"
                name="name"
              />
            </div>
            <div>
              <select
                className="input input-bordered border-green-500 mb-5 w-full"
                required
                {...register("role")}
              >
                <option disabled selected value={""}>
                  Pick your role
                </option>
                <option value={"principle"}>principle</option>
                <option value={"faculty"}>faculty</option>
                <option value={"teacher"}>teacher</option>
              </select>
            </div>
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
              {...register("number", {
                pattern: {
                  value: /^01\d{9}$/,
                  message:
                    "number must start with '01' and be exactly 11 digits long",
                },
              })}
              required
              placeholder="Enter Your number"
              name="number"
            />
            {errors.number && (
              <p className="text-red-500">{errors.number.message}</p>
            )}
          </div>
            <div className="relative w-full">
              <input
                className="input input-bordered border-green-500 mb-5 w-full pr-10" // Added padding to the right for the icon
                {...register("password")}
                required
                placeholder="Enter your Password"
                name="password"
                type={showPassword ? "text" : "password"} // Toggle input type
              />
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer mb-4"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <div>
              <textarea
                {...register("about")}
                required
                className="w-full p-1 border border-green-500"
                cols={20}
                rows={10}
                placeholder="write anout your self. like your qualification, experience and etc"
              ></textarea>
            </div>
            <div className="mb-2">
              <label>select your image <span className="text-green-400 font-bold">use a squire shape image it will show you better</span></label>
              <input type="file" required {...register("image")} />
            </div>
            <div>
              <p className="text-red-600">{error}</p>
              <p className="text-blue-400">{success}</p>
            </div>
            {user?.uid ? (
              <>
                <input
                  type="submit"
                  disabled
                  value={"wait for principle approve"}
                  className="btn btn-outline uppercase font-serif border-green-500 mb-5 w-full"
                />
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
                    value={"SignUp"}
                    className="btn btn-outline uppercase font-serif border-green-500 mb-5 w-full"
                  />
                )}
              </>
            )}
            <div>
              <p>
                {"Already have an accout ?"}{" "}
                <Link className="text-blue-400" href={"/components/login"}>
                  Login
                </Link>{" "}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
