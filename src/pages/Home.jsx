import React, { useCallback, useEffect, useState } from "react";
import SubjectCard from "../components/SubjectCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Error from "../components/Error";
import { CgSearch } from "react-icons/cg";
import { useNavigate } from "react-router";
import { getSubjectsApi, searchSubjectApi } from "../service/api";
import { MdSignalWifiConnectedNoInternet4 } from "react-icons/md";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

function Home() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [networkError, setNetworkError] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [semesterSubjects , setSemesterSubjects ] = useState([])
  const [isLoading, setIsLoading] = useState({
    semester: false,
    recent: false,
    page: true,
  });

  const reloadPage = () => {
    window.location.reload();
  };

  const getSemesterSubjects = useCallback(async () => {
    setNetworkError(false);
    setIsLoading((prev) => ({ ...prev, semester: true }));
    try {
      const { data, error } = await searchSubjectApi("semester", 1, 5);

      if (error) {
        if (error.message === "network error") {
          setIsLoading((prev) => ({ ...prev, page: false }));
          setNetworkError(true);
        }
        return setError(error.message);
      }
      const semesterSubs = data?.data?.subjects;

      setSemesterSubjects([...semesterSubs]);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading((prev) => ({ ...prev, semester: false }));
    }
  });

  const getSubjects = useCallback(async () => {
    setNetworkError(false);
    setIsLoading((prev) => ({ ...prev, recent: true }));
    try {
      const { data, error } = await getSubjectsApi(1, 5);

      if (error) {
        if (error.message === "network error") {
          setIsLoading((prev) => ({ ...prev, page: false }));

          setNetworkError(true);
        }
        return setError(error.message);
      }
      const loadedSubjects = data?.data?.subjects;

      setSubjects([...loadedSubjects]);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading((prev) => ({ ...prev, recent: false }));
    }
  });

  useEffect(() => {
    getSubjects();
    getSemesterSubjects();
    setIsLoading((prev) => ({ ...prev, page: false }));
  }, []);

  if (isLoading.page) {
    return (
      <div className="h-dvh w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {error && <Error setError={setError} error={error} />}
      <Header />
      {networkError ? (
        <div className="h-[70dvh] w-full flex flex-col justify-center items-center">
          <MdSignalWifiConnectedNoInternet4 className="text-9xl text-text-muted" />
          <p className="text-3xl font-main text-text-muted font-bold tracking-tight">
            No Internet
          </p>
          <button
            onClick={reloadPage}
            className="mt-6 text-lg bg-primary-color px-4 rounded-sm cursor-pointer outline-none border-none"
          >
            Reload
          </button>
        </div>
      ) : (
        <section className="px-[10vw] ">
          {/* Intro section  */}
          <div className="w-full grid grid-cols-2 max-sm:grid-cols-1">
            <div className="flex justify-center items-start flex-col">
              <h1
                style={{
                  WebkitTextFillColor: "transparent",
                  WebkitBackgroundClip: "text",
                }}
                className="text-5xl relative max-lg:text-3xl font-extrabold tracking-tight bg-[url('/images/text-gradient.png')] bg-cover py-4 "
              >
                Study on the Go{" "}
                <img
                  src="/images/star.png"
                  className="w-20 max-xs:w-10 absolute left-full bottom-1/2"
                />
              </h1>
              <p className="text-xl max-lg:text-base max-sm:text-sm text-text-muted font-light tracking-wider mt-6 max-sm:mt-2">
                Access notes in one organized system designed for effective
                learning. Whether you’re on your laptop, tablet, or phone, your
                notes are always just a click away.
              </p>
              <p className="text-lg font-semibold tracking-wider italic mt-10 max-sm:mt-4 w-fit relative">
                Happy Learning
                <img
                  src="/images/arrow.png"
                  alt="arrow"
                  className="w-20 max-xs:w-10  absolute rotate-45"
                />
              </p>
            </div>
            <div className="p-10 flex justify-center items-center">
              <img
                src="/images/home-hero.png"
                alt="hero"
                className="w-3/4 max-lg:w-full"
              />
            </div>
          </div>
          {/* Intro section  */}

          {/* Semester category */}
          <div className="py-10">
            {/* header  */}
            <div className="w-full flex justify-between items-center py-6">
              <h3 className="text-3xl font-semibold tracking-tighter max-xs:text-xl">
                Semester Notes
              </h3>
              <button
                onClick={() => navigate("/search?q=semester")}
                className="outline-none max-xs:text-sm border-b-2 border-b-transparent text-lg tracking-wide cursor-pointer hover:border-b-text-main transition-colors duration-300"
              >
                View All &gt;
              </button>
            </div>
            {/* header  */}
            {/* card-container  */}
            <div className="scroller w-full flex overflow-x-scroll gap-4 flex-nowrap py-4">
              {isLoading.semester ? (
                <Loader />
              ) : semesterSubjects.length === 0 ? (
                <p>There is no subject.</p>
              ) : (
                semesterSubjects.map((sub, i) => (
                  <SubjectCard subject={sub} key={i} />
                ))
              )}
            </div>
            {/* card-container  */}
          </div>
          {/* Semester category */}
          {/* Recent category */}
          <div className="py-10">
            {/* header  */}
            <div className="w-full flex justify-between items-center py-6">
              <h3 className="text-3xl font-semibold tracking-tighter max-xs:text-xl">
                Recently Added
              </h3>
              <button
                onClick={() => navigate("/all-subjects")}
                className="outline-none max-xs:text-sm border-b-2 border-b-transparent text-lg tracking-wide cursor-pointer hover:border-b-text-main transition-colors duration-300"
              >
                View All &gt;
              </button>
            </div>
            {/* header  */}
            {/* card-container  */}
            <div className="scroller w-full flex overflow-x-scroll gap-4 flex-nowrap py-4">
              {isLoading.semester ? (
                <Loader />
              ) : subjects.length === 0 ? (
                <p>There is no subject.</p>
              ) : (
                subjects.map((sub, i) => <SubjectCard subject={sub} key={i} />)
              )}
            </div>
            {/* card-container  */}
          </div>
          {/* Recent category */}
        </section>
      )}

      {/* navbar  */}
      <Navbar />
      {/* navbar  */}

      <div className="py-10">
        <Footer />
      </div>
    </>
  );
}
export default Home;
