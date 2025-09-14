import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UnitCard from "../components/UnitCard";
import { useNavigate, useParams } from "react-router";
import { getOneSubjectApi, getUnitApi, getUnitUrlApi } from "../service/api";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { MdSignalWifiConnectedNoInternet4 } from "react-icons/md";
import { BsArrowLeft } from "react-icons/bs";
import { usePWAInstall } from "../context/PWAInstallProvider";
import { getFiles, saveFiles } from "../service/indexDb";
import { useQuery } from "@tanstack/react-query";

const unitImgType = ["a", "b", "c"];

function Subject() {
  const navigate = useNavigate();
  const { subjectId } = useParams();
  const [networkError, setNetworkError] = useState(false);
  const [isDownLoading, setIsDownLoading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [imgType, setImgType] = useState(
    unitImgType[Math.floor(Math.random() * unitImgType.length)]
  );

  const [donwloadProgress, setDonwloadProgress] = useState({
    total: 0,
    completed: 0,
    failed: [],
  });

  const { isInstalled, installApp, deferredPrompt } = usePWAInstall();

  const {
    data: subject,
    error: subjectError,
    isError,
    isLoading: isLoadingPage,
    refetch: retrySubject,
  } = useQuery({
    queryKey: ["subject", subjectId],
    queryFn: () =>
      getOneSubjectApi(subjectId).then((res) => res.data.data.subject),
    staleTime: 60 * 60 * 1000,
  });

  const {
    data: units,
    isLoading: isLoadingUnits,
    error: unitError,
    refetch: retryUnit,
  } = useQuery({
    queryKey: ["units", subjectId],
    queryFn: () => getUnitApi(subjectId).then((res) => res.data.data.units),
    staleTime: 60 * 60 * 1000,
  });

  const handleDownload = async () => {
    try {
      if (units.length === 0) return;

      setIsDownLoading(true);
      setDonwloadProgress({ total: units.length, completed: 0, failed: [] });

      const unitBlobs = {};
      for (const unit of units) {
        try {
          const { data, error } = await getUnitUrlApi(unit._id);
          if (error) return;
          const res = await fetch(data?.data?.url);
          const blob = await res.blob();
          unitBlobs[unit._id] = blob;
          setDonwloadProgress((prev) => ({
            ...prev,
            completed: prev.completed + 1,
          }));
        } catch (error) {
          setDonwloadProgress((prev) => ({
            ...prev,
            failed: [...prev.failed, unit._id],
          }));
        }
      }
      setIsDownloaded(true);
      await saveFiles(subject, units, unitBlobs);
      navigate("/profile");
    } catch (error) {
      setError(error.message);
    }
  };

  const checkIsDownloaded = async () => {
    const loadedSubject = await getFiles(subjectId);
    if (loadedSubject) {
      return setIsDownloaded(true);
    } else {
      setIsDownloaded(false);
    }
  };

  useEffect(() => {
    checkIsDownloaded();
  }, []);

  if (isLoadingPage) {
    return (
      <div className="h-dvh w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  if (subjectError || unitError) {
    <div className="h-[70dvh] w-full flex flex-col justify-center items-center">
      <p className="text-base max-xs:text-sm font-main text-text-muted font-bold tracking-tight">
        {subjectError ? subjectError.message : unitError.message}
      </p>
      <button
        onClick={() => {
          retrySubject();
          retryUnit();
        }}
        className="text-base bg-primary-color border-none outline-none rounded-sm cursor-pointer"
      >
        Retry
      </button>
    </div>;
  }

  return (
    <>
      <Header />
      <div className="pl-6 my-6">
        <span className="cursor-pointer" onClick={() => navigate(-1)}>
          <BsArrowLeft size={30} />
        </span>
      </div>

      <section className="px-[10vw]">
        {networkError ? (
          <div className="h-[70dvh] w-full flex flex-col justify-center items-center">
            <MdSignalWifiConnectedNoInternet4 className="text-9xl text-text-muted" />
            <p className="text-3xl font-main text-text-muted font-bold tracking-tight">
              No Internet
            </p>
          </div>
        ) : (
          <main>
            {/* header of subject */}
            {subject && (
              <div className="flex justify-between items-start">
                <div className="w-[60%] space-y-6">
                  <h2 className="text-4xl font-semibold tracking-tight max-xs:text-xl">
                    {subject.title}
                  </h2>

                  {subject.description && (
                    <p className="text-base text-text-muted tracking-wide max-xs:text-sm">
                      {subject.description}
                    </p>
                  )}

                  <ul className="flex justify-start items-center flex-wrap gap-4">
                    {subject.tags.map((tag, i) => (
                      <li
                        key={i}
                        className="text-base max-xs:text-xs text-text-muted px-4 py-2 border-2 border-text-muted leading-none w-fit rounded-full bg-border-color"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-32 h-32">
                  <img
                    src={
                      subject.img
                        ? `data:${
                            subject.img.contentType
                          };base64,${subject.img.data.toString("base64")}`
                        : "/images/subject/sub-b.png"
                    }
                    alt="-img"
                    className="w-full object-center"
                  />
                </div>
              </div>
            )}
            {/* header of subject */}

            {/* Functionality  */}
            <div className="py-6">
              {isInstalled ? (
                <>
                  <p>
                    Install <span className="font-bold">NoteLab's</span> Web App
                    to use download feature.
                  </p>
                  <button
                    className="bg-primary-color px-4 py-0.5 text-base cursor-pointer rounded-sm mt-4 border-none outline-none"
                    onClick={installApp}
                  >
                    Install
                  </button>
                </>
              ) : isDownLoading ? (
                <div className="my-4">
                  <p className="text-base max-xs:text-sm">
                    Downloading: {donwloadProgress.completed}/
                    {donwloadProgress.total}
                  </p>
                  {donwloadProgress.failed.length > 0 && (
                    <>
                      <p className="text-base max-xs:text-sm">
                        Failed :{donwloadProgress.failed.length} unit(s)
                      </p>
                      <button
                        onClick={handleDownload}
                        className="text-lg outline-none select-none font-semibold tracking-tight bg-primary-color px-4 py-1 rounded-sm cursor-pointer"
                      >
                        Download
                      </button>
                    </>
                  )}
                </div>
              ) : isDownloaded ? (
                <button
                  onClick={() => navigate("/profile")}
                  className="text-lg outline-none select-none font-semibold tracking-tight bg-primary-color px-4 py-1 rounded-sm cursor-pointer"
                >
                  Go to downloads
                </button>
              ) : (
                <button
                  onClick={handleDownload}
                  className="text-lg outline-none select-none font-semibold tracking-tight bg-primary-color px-4 py-1 rounded-sm cursor-pointer"
                >
                  Download
                </button>
              )}
            </div>
            {/* Functionality  */}

            <div>
              {isLoadingUnits ? (
                <Loader />
              ) : (
                <>
                  <h3 className="text-2xl py-6">Chapters or Parts</h3>
                  <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(200px,200px))] justify-evenly gap-4">
                    {units.length === 0 ? (
                      <p>There is not unit in this Subject. </p>
                    ) : (
                      units.map((unit, index) => (
                        <UnitCard key={index} unit={unit} imgType={imgType} />
                      ))
                    )}
                  </div>
                </>
              )}
            </div>
          </main>
        )}
      </section>

      {/* navbar  */}
      <Navbar />
      {/* navbar  */}

      <Footer />
    </>
  );
}

export default Subject;
