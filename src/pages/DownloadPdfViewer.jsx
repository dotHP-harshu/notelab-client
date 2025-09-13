import React, { cache, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { getUnitUrlApi } from "../service/api";
import Error from "../components/Error";
import { CgDarkMode } from "react-icons/cg";
import {
  MdDarkMode,
  MdLightMode,
  MdSignalWifiConnectedNoInternet4,
} from "react-icons/md";
import Loader from "../components/Loader";
import {getFiles} from "../service/indexDb"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();


function DownloadPdfViewer() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [searchParams, setSearchParams] = useSearchParams()
  const [numPages, setNumPages] = useState(null);
  const [error, setError] = useState("");
  const [filedata, setfiledata] = useState(null);
  const [mode, setMode] = useState(localStorage.getItem("pdf-mode") || "light");
  const [isLoading, setIsLoading] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [pdfError, setPdfError] = useState(false);

  const changeMode = (mode) => {
    localStorage.setItem("pdf-mode", mode);
  };

  const getPdf = async () => {
    setIsLoading(true);
    const unitId = searchParams.get("unitid");
    const subjectId = searchParams.get("subjectid")
    const downloadedSubject = await getFiles(subjectId)  
    if(!downloadedSubject) return setError("Subject not found in storage.")
    
    const blob = downloadedSubject.unitBlobs[unitId];
    if(!blob ) return setError("There is an error on getting downloaded unit")
    
    setfiledata(blob)
    setIsLoading(false)
  };

  const onLoadedSuccessfull = ({ numPages }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    getPdf();
  }, []);

  if (isLoading) {
    return (
      <div className="h-dvh w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (networkError) {
    return (
      <div className="h-[100dvh] w-full flex flex-col justify-center items-center">
        <MdSignalWifiConnectedNoInternet4 className="text-9xl text-text-muted" />
        <p className="text-3xl font-main text-text-muted font-bold tracking-tight">
          No Internet
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 text-lg bg-primary-color px-4 rounded-sm cursor-pointer outline-none border-none"
        >
          Reload Page
        </button>
      </div>
    );
  }

  if (pdfError) {
    return (
      <div className="min-h-dvh w-full flex flex-col justify-center items-center">
        <p className="text-xl text-red-500 font-bold mb-4">
          Failed to load PDF.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 text-lg bg-primary-color px-4 rounded-sm cursor-pointer outline-none border-none"
        >
          Reload Page
        </button>
      </div>
    );
  }

  return (
    <div
      className={`w-full flex justify-center items-center bg-bg-color min-h-dvh ${
        mode === "dark" ? "bg-gray-600 " : ""
      }`}
    >
      {error && <Error error={error} setError={setError} />}

      <nav
        className={`bg-bg-sec-color w-full flex justify-between items-center fixed top-0 left-0 z-50 px-6 py-4 max-xs:p-2 ${
          mode === "dark" ? "bg-gray-800 text-white" : ""
        }`}
      >
        <span className="cursor-pointer" onClick={() => navigate(-1)}>
          <BsArrowLeft size={30} />
        </span>
        <span
          className="w-fit h-fit cursor-pointer"
          onClick={() => {
            setMode((prev) => (prev === "light" ? "dark" : "light"));
            changeMode(mode);
          }}
        >
          {mode === "dark" ? (
            <MdDarkMode className="text-3xl max-xs:text-xl" />
          ) : (
            <MdLightMode className="text-3xl max-xs:text-xl" />
          )}
        </span>
      </nav>

      {filedata && (
        <Document
          file={filedata}
          onLoadSuccess={onLoadedSuccessfull}
          onLoadError={(err) => {
            console.error("onLoadError", err);
            setPdfError(true);
          }}
          onSourceError={(err) => {
            console.error("onSourceError", err);
            setPdfError(true);
          }}
          error={
            <div className="h-dvh w-full flex justify-center items-center">
              Error on loading pdf
            </div>
          }
          className={`w-fit flex justify-center items-center flex-col mt-20 max-xs:mt-10 ${
            mode === "dark" ? "invert-75" : ""
          }`}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={index}
              className={"min-w-fit w-auto"}
              width={Math.min(window.innerWidth * 0.9, 1200)}
              pageIndex={index}
              renderTextLayer={true}
              renderAnnotationLayer={true}
            />
          ))}
        </Document>
      )}
    </div>
  );
}

export default DownloadPdfViewer;
