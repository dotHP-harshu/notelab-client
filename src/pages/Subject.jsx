import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UnitCard from "../components/UnitCard";
import { data, NavLink, useNavigate, useParams } from "react-router";
import Error from "../components/Error";
import { getOneSubjectApi, getUnitApi, getUnitUrlApi } from "../service/api";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { MdSignalWifiConnectedNoInternet4 } from "react-icons/md";
import { BsArrowLeft } from "react-icons/bs";
import { usePWAInstall } from "../context/PWAInstallProvider";
import { getFiles, saveFiles } from "../service/indexDb";
import { LuLoaderCircle } from "react-icons/lu";

const unitImgType = ["a", "b", "c"];

function Subject() {
  const navigate = useNavigate();
  const { subjectId } = useParams();
  const [units, setUnits] = useState([]);
  const [error, setError] = useState(null);
  const [subject, setSubject] = useState(null);
  const [networkError, setNetworkError] = useState(false);
  const [isLoading, setIsLoading] = useState({
    page: true,
    units: true,
  });
  const [isDownLoading, setIsDownLoading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [imgType, setImgType] = useState(
    unitImgType[Math.floor(Math.random() * unitImgType.length)]
  );

  const { isInstalled, installApp, deferredPrompt } = usePWAInstall();

  const getSubject = async () => {
    try {
      const { data, error } = await getOneSubjectApi(subjectId);
      if (error) {
        if (error.message === "network error") {
          setNetworkError(true);
        }
        return setError(error?.message);
      }

      setSubject(data.data.subject);
    } catch (error) {
      setError(error?.message);
    } finally {
      setIsLoading((prev) => ({ ...prev, page: false }));
    }
  };

  const handleDownload = async () => {
    try {
      if (units.length === 0) return;
      setIsDownLoading(true);

      const unitArray = units.map(async (unit) => {
        const { data, error } = await getUnitUrlApi(unit._id);
        if (error) return;
        const res = await fetch(data?.data?.url);
        const blob = await res.blob();
        return { id: unit._id, name: unit.name, blob };
      });
      const result = await Promise.all(unitArray);
      await saveFiles(subject, result);
    } catch (error) {
      setError(error.message);
    }
  };

  const getUnits = async () => {
    try {
      const { data, error } = await getUnitApi(subjectId);
      if (error) return setError(error.message);

      const loadedUnits = data?.data?.units;
      setUnits([...loadedUnits]);
    } catch (error) {
      setError(error?.message);
    } finally {
      setIsLoading((prev) => ({ ...prev, units: false }));
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
    getUnits();
    getSubject();
    checkIsDownloaded();
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
      <Header />
      <div className="pl-6 my-6">
        <span className="cursor-pointer" onClick={() => navigate(-1)}>
          <BsArrowLeft size={30} />
        </span>
      </div>

      <section className="px-[10vw]">
        {error && <Error error={error} setError={setError} />}

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
                isDownloaded ? (
                  <button
                    onClick={() => navigate("/profile")}
                    className="text-lg outline-none select-none font-semibold tracking-tight bg-primary-color px-4 py-1 rounded-sm cursor-pointer"
                  >
                    Go to Downloads
                  </button>
                ) : (
                  <button
                    onClick={handleDownload}
                    className="text-lg outline-none select-none font-semibold tracking-tight bg-primary-color px-4 py-1 rounded-sm cursor-pointer"
                  >
                    {isDownLoading ? (
                      <LuLoaderCircle
                        size={20}
                        className="text-text-main animate-spin"
                      />
                    ) : (
                      "Download"
                    )}
                  </button>
                )
              ) : (
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
              )}
            </div>
            {/* Functionality  */}

            <div>
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
