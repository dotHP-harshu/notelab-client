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
import { useQuery } from "@tanstack/react-query";
import { BiArrowToRight } from "react-icons/bi";

function Home() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [networkError, setNetworkError] = useState(false);

  const reloadPage = () => {
    window.location.reload();
  };

  const {
    data: semesterSubjects,
    isLoading: isLoadingSemesterSubjects,
    error: semesterSubjectError,
  } = useQuery({
    queryKey: ["subjects", "semester"],
    queryFn: () =>
      searchSubjectApi("semester", 1, 5).then((res) => res.data.data.subjects),
    staleTime: 60 * 60 * 1000,
  });

  const {
    data: recentSubjects,
    isLoading: isLoadingRecentSubject,
    error: recentSubjectError,
  } = useQuery({
    queryKey: ["subject", "recent"],
    queryFn: () => getSubjectsApi(1, 5).then((res) => res.data.data.subjects),
    staleTime: 60 * 60 * 1000,
  });

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
            <div className="scroller w-full flex overflow-x-scroll gap-4 flex-nowrap py-4 relative">
              <div className="absolute top-0 right-0 bg-[#84848423] w-fit h-full flex justify-center items-center z-30">
                <BiArrowToRight size={16} className="text-primary-color" />
              </div>
              {semesterSubjectError && (
                <p className="text-sm text-error">
                  {semesterSubjectError.message}
                </p>
              )}
              {isLoadingSemesterSubjects ? (
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
            <div className="scroller w-full flex overflow-x-scroll gap-4 flex-nowrap py-4 relative">
              <div className="absolute top-0 right-0 bg-[#00000048] w-fit h-full flex justify-center items-center z-30">
                <BiArrowToRight size={16} className="text-primary-color" />
              </div>
              {recentSubjectError && (
                <p className="text-sm text-error">
                  {recentSubjectError.message}
                </p>
              )}
              {isLoadingRecentSubject ? (
                <Loader />
              ) : recentSubjects.length === 0 ? (
                <p>There is no subject.</p>
              ) : (
                recentSubjects.map((sub, i) => (
                  <SubjectCard subject={sub} key={i} />
                ))
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
