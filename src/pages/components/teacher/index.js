/* eslint-disable @next/next/no-img-element */
import TruncatedText from "@/pages/utility";
import Head from "next/head";
import { useState, useEffect } from "react";

export default function Teacher() {
  const [teacher, setTeacher] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    // Fetch faculty data from an API route
    const fetchFacultyData = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          "https://pomkara-high-school-server.vercel.app/teachers"
        );
        const data = await response.json();
        const approvedTeacher = data.filter((faculty) => faculty.isApprove);

        setTeacher(approvedTeacher);
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

  const displayedTeacher = showAll ? teacher : teacher.slice(0, 6);

  return (
    <div>
      <Head>
        <title>
          Our Teachers | Pomkara Siddikur Rahman & Hakim High School
        </title>
        <meta
          name="description"
          content="Meet the dedicated teachers at Pomkara Siddikur Rahman & Hakim High School. Discover our team of educators committed to providing quality education and fostering a supportive learning environment."
        />
        <meta
          name="keywords"
          content="teachers, Pomkara Siddikur Rahman & Hakim High School, educators, faculty, teaching staff"
        />
        <meta
          property="og:title"
          content="Our Teachers - Pomkara Siddikur Rahman & Hakim High School"
        />
        <meta
          property="og:description"
          content="Explore the profiles of our dedicated teachers at Pomkara Siddikur Rahman & Hakim High School. Learn about their qualifications and roles in providing excellent education."
        />
        <meta
          property="og:image"
          content="[URL to an image related to teachers or the school]"
        />
        <meta
          property="og:url"
          content="https://pomkara-high-school.netlify.app/components/teacher"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Our Teachers - Pomkara Siddikur Rahman & Hakim High School"
        />
        <meta
          name="twitter:description"
          content="Meet the teachers of Pomkara Siddikur Rahman & Hakim High School. Find out more about their roles and contributions to our educational community."
        />
        <meta
          name="twitter:image"
          content="[URL to an image related to teachers or the school]"
        />
      </Head>
      <div className="bg-gray-100 min-h-screen py-10 px-6">
        <h1 className="text-4xl font-semibold text-center mb-10">
          Our Teachers
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {displayedTeacher.map((teacher) => (
            <div key={teacher._id} className="bg-base-100 shadow-xl rounded-xl">
              <div>
                <img
                  src={teacher.image}
                  alt={`${teacher.name}'s profile`}
                  className="w-40 h-40 mx-auto rounded-full mt-2"
                />
              </div>
              <div className="text-center p-4">
                <h2 className="text-xl font-semibold">{teacher.name}</h2>
                <p>{teacher.email}</p>
                <p>{teacher.number}</p>
                <p>
                  <TruncatedText text={teacher.about} maxWords={40} />
                </p>
              </div>
            </div>
          ))}
        </div>
        {teacher.length > 6 && (
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
    </div>
  );
}
