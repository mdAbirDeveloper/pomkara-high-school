/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import Head from "next/head";
import React, { useEffect, useState } from "react";

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://pomkara-high-school-server.vercel.app/getNotices"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch notices");
        }
        const data = await response.json();
        setNotices(data);
        //console.log(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
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

  if (notices.length == 0) {
    return (
      <div className="text-center text-2xl font-serif uppercase mt-3">
        there are no notice here for now
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Notices | Pomkara Siddikur Rahman & Hakim High School</title>
        <meta
          name="description"
          content="Stay updated with the latest notices and announcements from Pomkara Siddikur Rahman & Hakim High School. Check out important updates and information here."
        />
        <meta
          name="keywords"
          content="notices, Pomkara Siddikur Rahman & Hakim High School, announcements, updates, school news"
        />
        <meta
          property="og:title"
          content="Notices - Pomkara Siddikur Rahman & Hakim High School"
        />
        <meta
          property="og:description"
          content="View the latest notices and announcements from Pomkara Siddikur Rahman & Hakim High School. Stay informed with important updates and news."
        />
        <meta
          property="og:image"
          content="[URL to an image related to notices or the school]"
        />
        <meta
          property="og:url"
          content="https://pomkara-high-school.netlify.app/components/notices"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Notices - Pomkara Siddikur Rahman & Hakim High School"
        />
        <meta
          name="twitter:description"
          content="Stay updated with important notices and announcements from Pomkara Siddikur Rahman & Hakim High School. Find all the latest updates here."
        />
        <meta
          name="twitter:image"
          content="[URL to an image related to notices or the school]"
        />
      </Head>
      <div>
        <div className="flex flex-col gap-6 items-center px-4">
          {notices?.map((notice) => (
            <div
              key={notice._id}
              className="max-w-[800px] w-full bg-white rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-[1.01] overflow-hidden"
            >
              <h2 className="text-2xl md:text-4xl font-bold text-green-500 font-serif text-center py-4 px-2">
                {notice.heading}
              </h2>

              {notice.image && (
                <img
                  src={notice.image}
                  alt="Notice"
                  className="w-full h-auto object-cover px-4 rounded"
                />
              )}

              <p className="text-lg text-gray-700 p-4 font-serif text-justify">
                {notice.paragraph}
              </p>

              <div className="bg-gray-100 text-gray-700 py-3 px-4 text-sm font-serif flex flex-col sm:flex-row justify-between items-center">
                <p>
                  <span className="font-semibold">Uploaded By:</span>{" "}
                  {notice.uploader?.name}
                </p>
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date(notice.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notice;
