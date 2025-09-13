import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UnitCard from "../components/UnitCard";
import { useNavigate, useParams } from "react-router";
import Error from "../components/Error";
import Navbar from "../components/Navbar";
import { MdSignalWifiConnectedNoInternet4 } from "react-icons/md";
import { BsArrowLeft } from "react-icons/bs";
import { usePWAInstall } from "../context/PWAInstallProvider";
import { LuLoaderCircle } from "react-icons/lu";
import { deleteDownload, getFiles } from "../service/indexDb";
import DownloadUnitCard from "../components/DownloadUnitCard";
import Loader from "../components/Loader"

const unitImgType = ["a", "b", "c"];
function DownloadSubject() {
  const navigate = useNavigate();
  const { subjectId } = useParams();
  const [units, setUnits] = useState([]);
  const [error, setError] = useState(null);
  const [subject, setSubject] = useState(null);
  const [imgType, setImgType] = useState(
    unitImgType[Math.floor(Math.random() * unitImgType.length)]
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const getSubject = async () => {
    const downloadedSub = await getFiles(subjectId);
    setSubject(downloadedSub.subject);
    setUnits([...downloadedSub.units]);
  };

  const handleDelete = async ()=>{
    setIsDeleting(true)
    await deleteDownload(subjectId)
    navigate("/profile")
  }

  useEffect(() => {
    getSubject();
  }, []);

  return (
    <>
      <Header />
      <div className="pl-6">
        <span className="cursor-pointer" onClick={() => navigate(-1)}>
          <BsArrowLeft size={30} />
        </span>
      </div>

      <section className="px-[10vw]">
        {error && <Error error={error} setError={setError} />}

        <main>
          {/* header of subject */}
          {subject && (
            <div className="flex justify-between items-start">
              <div className="w-[60%] space-y-6">
                <h2 className="text-4xl font-semibold tracking-tight ">
                  {subject.title}
                </h2>

                {subject.description && (
                  <p className="text-base text-text-muted tracking-wide ">
                    {subject.description}
                  </p>
                )}

                <ul className="flex justify-start items-center flex-wrap gap-4">
                  {subject.tags.map((tag, i) => (
                    <li
                      key={i}
                      className="text-base text-text-muted px-4 py-2 border-2 border-text-muted leading-none w-fit rounded-full bg-border-color"
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
            <button
                  onClick={handleDelete}
                  className="text-lg outline-none select-none font-semibold tracking-tight bg-error px-4 py-1 rounded-sm cursor-pointer"
                >{isDeleting ? (<Loader/>) : "Delete"}</button>
          </div>
          {/* Functionality  */}

          <div>
            <h3 className="text-2xl py-6">Chapters or Parts</h3>
            <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(200px,200px))] justify-evenly gap-4">
              {units.length === 0 ? (
                <p>There is not unit in this Subject. </p>
              ) : (
                units.map((unit, index) => (
                  <DownloadUnitCard
                    subjectId={subjectId}
                    key={index}
                    unit={unit}
                    imgType={imgType}
                  />
                ))
              )}
            </div>
          </div>
        </main>
      </section>

      {/* navbar  */}
      <Navbar />
      {/* navbar  */}

      <Footer />
    </>
  );
}

export default DownloadSubject;
