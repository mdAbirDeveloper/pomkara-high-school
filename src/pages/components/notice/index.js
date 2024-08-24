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
      setLoading(true)
      try {
        const response = await fetch("http://localhost:5000/getNotices");
        if (!response.ok) {
          throw new Error("Failed to fetch notices");
        }
        const data = await response.json();
        setNotices(data);
        console.log(data);
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
        <meta property="og:url" content="https://pomkara-high-school.netlify.app/components/notices" />
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
        <div className="">
          {notices?.map((notice) => (
            <>
              <div className="max-w-[800px] mx-auto shadow-xl bg-white text-center mt-5">
                <h2 className="md:text-4xl text-xl font-bold font-serif text-green-400 py-3">
                  {notice.heading}
                </h2>
                <img
                  src={notice.image}
                  className="mx-auto w-full px-10 rounded"
                />
                <p className="text-lg mt-3 p-4 font-serif">
                  {notice.paragraph}
                </p>
                <div className="shadow-xl pb-2 bg-base-300 font-serif">
                  <p>Upload By : {notice.uploader.name}</p>
                  <p>
                    Update Date:{" "}
                    {new Date(notice.createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notice;
