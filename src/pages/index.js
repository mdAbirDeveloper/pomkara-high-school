
import Faculty from "./components/faculty";
import TopSection from "./components/home";
import Teacher from "./components/teacher";
import Contact from "./components/contact";
import Head from "next/head";
import Gallery from "./components/gallary";
import Notices from "./components/notice";

export default function Home() {


  return (
    <div>
      <Head>
        <title>Home | Pomkara Siddikur Rahman & Hakim High School</title>
        <meta name="description" content="Pomkara Siddikur Rahman & Hakim High School offers a comprehensive education with a focus on academic excellence and personal development. Learn more about our programs, faculty, and student life." />
        <meta name="keywords" content="school, education, academic excellence, Pomkara Siddikur Rahman & Hakim High School, faculty, student life" />
        <meta property="og:title" content="Pomkara Siddikur Rahman & Hakim High School - Home" />
        <meta property="og:description" content="Pomkara Siddikur Rahman & Hakim High School provides an engaging learning environment with dedicated faculty and a variety of programs. Discover more about our school." />
        <meta property="og:image" content="[URL to an image representing your school]" />
        <meta property="og:url" content="https://pomkara-high-school.netlify.app/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pomkara Siddikur Rahman & Hakim High School - Home" />
        <meta name="twitter:description" content="Pomkara Siddikur Rahman & Hakim High School offers a dynamic education experience with a focus on student success and community involvement." />
        <meta name="twitter:image" content="[URL to an image representing your school]" />
      </Head>
      <div>
        <TopSection />
        <Notices />
        <Teacher />
        <Gallery />
        <Contact />
      </div>
    </div>
  );
}
