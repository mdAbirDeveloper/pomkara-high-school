import Head from "next/head";
import Link from "next/link";
import React from "react";
import { FaArrowCircleRight } from "react-icons/fa";

const TopSection = () => {
  return (
    <div>
      <Head>
        <title>Home | Pomkara Siddikur Rahman & Hakim High School</title>
        <meta name="description" content="Pomkara Siddikur Rahman & Hakim High School offers a comprehensive education with a focus on academic excellence and personal development. Learn more about our programs, faculty, and student life." />
        <meta name="keywords" content="school, education, academic excellence, Pomkara Siddikur Rahman & Hakim High School, faculty, student life" />
        <meta property="og:title" content="Pomkara Siddikur Rahman & Hakim High School - Home" />
        <meta property="og:description" content="Pomkara Siddikur Rahman & Hakim High School provides an engaging learning environment with dedicated faculty and a variety of programs. Discover more about our school." />
        <meta property="og:image" content="[URL to an image representing your school]" />
        <meta property="og:url" content="https://pomkara-high-school.netlify.app/components/faculty" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pomkara Siddikur Rahman & Hakim High School - Home" />
        <meta name="twitter:description" content="Pomkara Siddikur Rahman & Hakim High School offers a dynamic education experience with a focus on student success and community involvement." />
        <meta name="twitter:image" content="[URL to an image representing your school]" />
      </Head>
      <div className="bg-gray-100">
        {/* Hero Section */}
        <section className=" bg-[url('/home.jpeg')] bg-cover bg-center text-white">
          <div className="bg-black bg-opacity-50 py-20 px-6 sm:py-32 sm:px-12 text-center">
            <h1 className="text-4xl font-bold sm:text-6xl">
              Welcome to Pomkara Siddikur Rahman & Hakim High School
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl">
              Empowering students to achieve their full potential.
            </p>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 px-6 sm:py-24 sm:px-12">
          <h2 className="text-3xl font-semibold text-center mb-8">About Us</h2>
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-700">
                At Pomkara Siddikur Rahman & Hakim High School, our mission is
                to provide a nurturing and stimulating learning environment
                where students can thrive academically, socially, and
                emotionally. We are dedicated to fostering a love for learning
                and empowering our students to become responsible, innovative,
                and engaged citizens.
              </p>
            </section>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
              <ul className="list-disc pl-5 text-gray-700">
                <li>
                  <strong>Excellence:</strong> We strive for the highest
                  standards in education and personal growth.
                </li>
                <li>
                  <strong>Integrity:</strong> We promote honesty, respect, and
                  ethical behavior in all aspects of our school life.
                </li>
                <li>
                  <strong>Inclusivity:</strong> We value and celebrate
                  diversity, ensuring that every student feels welcome and
                  valued.
                </li>
                <li>
                  <strong>Collaboration:</strong> We believe in the power of
                  teamwork and partnership among students, staff, and the
                  community.
                </li>
                <li>
                  <strong>Innovation:</strong> We embrace creativity and
                  encourage students to think critically and explore new ideas.
                </li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-4">Our History</h2>
              <p className="text-gray-700">
                Founded in [Year], Pomkara Siddikur Rahman & Hakim High School
                has a rich history of academic excellence and community
                involvement. Over the years, we have grown into a leading
                institution dedicated to providing a well-rounded education that
                prepares students for future success.
              </p>
            </section>
          </div>
        </section>

        {/* Features/Programs Section */}
        <section className="bg-white py-16 px-6 sm:py-24 sm:px-12">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Our Programs
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            <div className="bg-gray-200 p-6 rounded-lg text-center">
              <h3 className="text-xl font-semibold mb-2">
                Academic Excellence
              </h3>
              <p className="text-gray-700">
                Comprehensive curriculum designed to challenge and inspire
                students.
              </p>
            </div>
            <div className="bg-gray-200 p-6 rounded-lg text-center">
              <h3 className="text-xl font-semibold mb-2">Sports & Athletics</h3>
              <p className="text-gray-700">
                Diverse athletic programs encouraging teamwork and physical
                fitness.
              </p>
            </div>
            <div className="bg-gray-200 p-6 rounded-lg text-center">
              <h3 className="text-xl font-semibold mb-2">Clubs & Activities</h3>
              <p className="text-gray-700">
                A variety of clubs and extracurriculars to nurture creativity
                and leadership.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-blue-600 text-white py-16 px-6 sm:py-24 sm:px-12 text-center">
          <h2 className="text-3xl font-semibold mb-8">Get in Touch</h2>
          <p className="max-w-xl mx-auto mb-8">
            For more information, please contact us or visit our school to learn
            more about our programs and opportunities.
          </p>
          <button className="flex mx-auto bg-white">
          <Link
            href="/components/contact"
            className="inline-block text-blue-600 font-semibold py-3 px-6 rounded-lg"
          >
            Contact Us
          </Link>
            <FaArrowCircleRight className="mt-4 mr-2 text-blue-600 text-xl" />
          </button>
        </section>
      </div>
    </div>
  );
};

export default TopSection;
