import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SubjectCard from "../components/SubjectCard";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import Error from "../components/Error";
import { deleteUser, getUser, setUser } from "../utils/auth";
import { getUserApi, logoutUserApi } from "../service/api";
import Loader from "../components/Loader";
import { usePWAInstall } from "../context/PWAInstallProvider";
import { getAllDownloads } from "../service/indexDb";
import DownloadSubjectCard from "../components/DownloadSubjectCard";

function Profile() {
  const [error, setError] = useState("");
  const [profileUser, setProfileUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [downloads, setDownloads] = useState([]);
  const { isInstalled, installApp, deferredPrompt } = usePWAInstall();

  const navigate = useNavigate();

  const logoutUser = async () => {
    const { data, error } = await logoutUserApi();
    if (error) return setError(error.message);
    deleteUser();
    navigate("/login");
  };

  const getDownloadSubjects = async () => {
    const loadedSubjects = await getAllDownloads();
    setDownloads([...loadedSubjects]);
  };

  if (isLoading) {
    return (
      <div className="h-dvh w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  const gettingUser = async () => {
    setIsLoading(true);
    try {
      const localUser = getUser();
      if (!localUser) {
        const { data, error } = await getUserApi();
        if (error) {
          return setError(error.message);
        }
        const loggedUser = data?.data?.user;
        setUser(loggedUser);
        setProfileUser(loggedUser);
      }
      setProfileUser(localUser);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    gettingUser();
    getDownloadSubjects();
  }, []);

  return (
    <>
      <Header />
      {error && <Error setError={setError} error={error} />}

      {/* user info section  */}
      <section className="px-10 py-10 max-xs:px-2">
        {profileUser && (
          <div className="bg-surface-color rounded-md p-6 flex justify-end items-center gap-6 max-sm:justify-center max-sm:flex-col">
            <span className="flex justify-center items-center w-20 h-20 rounded-full overflow-hidden">
              <img
                src="/images/profile.png"
                alt="profile-img"
                className="w-full aspect-square object-center"
              />
            </span>
            <span className="max-sm:text-center">
              <h2 className="text-2xl font-bold tracking-tight max-xs:text-xl">
                {profileUser.name}
              </h2>
              <h4 className="text-base text-text-muted font-main tracking-wide font-semibold">
                {profileUser.email}
              </h4>
              <p className="capitalize font-semibold text-sm">
                {profileUser.role}
              </p>
            </span>
          </div>
        )}
      </section>
      {/* user info section  */}

      {/* Bookmarks */}
      {/* <section className="py-10 px-10 max-xs:px-2">
        <div className="w-full flex justify-between items-center py-6">
          <h3 className="text-3xl font-semibold tracking-tighter max-xs:text-xl">Bookmarks</h3>
          <button
            onClick={() => navigate("/bookmark")}
            className="outline-none border-b-2 border-b-transparent max-xs:text-sm text-lg tracking-wide cursor-pointer hover:border-b-text-main transition-colors duration-300"
          >
            View All &gt;
          </button>
        </div>
        <div className="scroller w-full flex overflow-x-scroll gap-4 flex-nowrap py-4"></div>
      </section> */}
      {/* Bookmarks */}
      {/* Downloads*/}
      <section className="py-10 px-10 max-xs:px-2">
        <div className="w-full flex justify-between items-center py-6">
          <h3 className="text-3xl font-semibold tracking-tighter max-xs:text-xl">
            Downloads
          </h3>
        </div>
        <div className="scroller w-full flex overflow-x-scroll gap-4 flex-nowrap py-4 min-h-[200px]">
          {!isInstalled ? (
            <div>
              <p>
                Install <span className="font-bold">NoteLab's</span> Web App to
                use this feature.
              </p>
              <button
                className="bg-primary-color px-4 py-0.5 text-base cursor-pointer rounded-sm mt-4 border-none outline-none"
                onClick={installApp}
              >
                Install
              </button>
            </div>
          ) : downloads.length === 0 ? (
            "There is no downloads"
          ) : (
            downloads.map((dwn, index) => (
              <DownloadSubjectCard key={index} subject={dwn.subject} />
            ))
          )}
        </div>
      </section>
      {/* Downloads */}

      {/* Logout section  */}
      <section className="p-10 w-full mb-10 inline-block">
        <button
          className="outline-none border-none w-fit mx-auto block text-red-800 cursor-pointer hover:bg-red-200 px-4 py-0.5 transition-colors duration-300 rounded-full "
          onClick={() => logoutUser()}
        >
          Logout
        </button>
      </section>
      {/* Logout section  */}

      {/* navbar */}
      <Navbar />
      {/* navbar */}
    </>
  );
}

export default Profile;
