/* eslint-disable @next/next/no-img-element */
import TruncatedText from "@/pages/utility";
import Head from "next/head";
import { useState, useEffect } from "react";

export default function Faculty() {
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    // Fetch faculty data from an API route
    const fetchFacultyData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://pomkara-high-school-server.vercel.app/faculty"
        );
        const data = await response.json();
        const approvedFaculties = data.filter((faculty) => faculty.isApprove);

        setFaculties(approvedFaculties);
      } catch (error) {
        console.error("Failed to load faculty data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFacultyData();
  }, []);

  if (loading) {
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

  const displayedFaculties = showAll ? faculties : faculties.slice(0, 6);

  return (
    <>
      <Head>
        <title>Our Faculty | Pomkara Siddikur Rahman & Hakim High School</title>
        <meta
          name="description"
          content="Meet the dedicated faculty members of Pomkara Siddikur Rahman & Hakim High School. Learn more about our experienced teachers and their commitment to providing quality education."
        />
        <meta
          name="keywords"
          content="faculty, Pomkara Siddikur Rahman & Hakim High School, teachers, education, staff"
        />
        <meta
          property="og:title"
          content="Our Faculty - Pomkara Siddikur Rahman & Hakim High School"
        />
        <meta
          property="og:description"
          content="Discover the team of experienced faculty members at Pomkara Siddikur Rahman & Hakim High School. Our dedicated teachers are committed to delivering excellent education."
        />
        <meta
          property="og:image"
          content="[URL to an image related to faculty or the school]"
        />
        <meta property="og:url" content="https://pomkara-high-school.netlify.app/components/faculty" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Our Faculty - Pomkara Siddikur Rahman & Hakim High School"
        />
        <meta
          name="twitter:description"
          content="Meet the faculty at Pomkara Siddikur Rahman & Hakim High School. Learn about our experienced teachers and their dedication to education."
        />
        <meta
          name="twitter:image"
          content="[URL to an image related to faculty or the school]"
        />
      </Head>
      <div className="bg-gray-100 py-10 px-6">
        <h1 className="text-4xl font-semibold text-center mb-10">
          Our Faculty
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {displayedFaculties.map((faculty) => (
            <div key={faculty._id} className="bg-base-100 shadow-xl">
              <div>
                <img
                  src={faculty.image}
                  alt={`${faculty.name}'s profile`}
                  className="w-40 h-40 mx-auto"
                />
              </div>
              <div className="text-center p-4">
                <h2 className="text-xl font-semibold">{faculty.name}</h2>
                <p>{faculty.email}</p>
                <p>{faculty.number}</p>
                <TruncatedText text={faculty.about} maxWords={40} />
              </div>
            </div>
          ))}
        </div>
        {faculties.length > 6 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
