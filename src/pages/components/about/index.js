// pages/about.js
import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us | Pomkara Siddikur Rahman & Hakim High School</title>
        <meta name="description" content="Learn more about Pomkara Siddikur Rahman & Hakim High School, our mission, and our values." />
      </Head>
      <div className="bg-gray-100 min-h-screen py-10 px-6">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700">
              At Pomkara Siddikur Rahman & Hakim High School, our mission is to provide a nurturing and stimulating learning environment where students can thrive academically, socially, and emotionally. We are dedicated to fostering a love for learning and empowering our students to become responsible, innovative, and engaged citizens.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <ul className="list-disc pl-5 text-gray-700">
              <li><strong>Excellence:</strong> We strive for the highest standards in education and personal growth.</li>
              <li><strong>Integrity:</strong> We promote honesty, respect, and ethical behavior in all aspects of our school life.</li>
              <li><strong>Inclusivity:</strong> We value and celebrate diversity, ensuring that every student feels welcome and valued.</li>
              <li><strong>Collaboration:</strong> We believe in the power of teamwork and partnership among students, staff, and the community.</li>
              <li><strong>Innovation:</strong> We embrace creativity and encourage students to think critically and explore new ideas.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our History</h2>
            <p className="text-gray-700">
              Founded in [Year], Pomkara Siddikur Rahman & Hakim High School has a rich history of academic excellence and community involvement. Over the years, we have grown into a leading institution dedicated to providing a well-rounded education that prepares students for future success.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
