import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { NavLink, useNavigate, useParams, useSearchParams } from "react-router";
import { BsArrowLeft } from "react-icons/bs";
import { CgSearch } from "react-icons/cg";
import { searchSubjectApi } from "../service/api";
import Loader from "../components/Loader";
import Error from "../components/Error";
import SubjectCard from "../components/SubjectCard";
import Navbar from "../components/Navbar";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") || "";
  const page = Number(searchParams.get("page")) || 1;
  const limit = 5;

  const [inputQuery, setInputQuery] = useState(searchParams.get("q") || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [subjects, setSubjects] = useState(null);
  const [pagination, setPagination] = useState(null);
  const navigate = useNavigate();

  // Handles the actual API call
  const searchSubjects = async () => {
    if (!query) return;
    setIsLoading(true);
    try {
      const { data, error } = await searchSubjectApi(query, page, limit);

      if (error) {
        setError(error.message);
        return;
      }

      const subs = data?.data?.subjects || [];
      setSubjects(subs);
      setPagination(data?.data?.pagination || null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger API call when query or page changes
  useEffect(() => {
    searchSubjects();
  }, [query, page]);

  // When user submits the search
  const handleSearch = (e) => {
    e.preventDefault();
    if (inputQuery.trim() === "") return;
    navigate(`/search?q=${inputQuery}&page=1`);
  };

  const handleNext = () => {
    if (pagination?.hasNext) {
      navigate(`/search?q=${query}&page=${page + 1}`);
    }
  };

  const handlePrev = () => {
    if (pagination?.hasPrev) {
      navigate(`/search?q=${query}&page=${page - 1}`);
    }
  };

  if (isLoading) {
    return (
      <div className="h-dvh w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Header />

      {/* Search section  */}
      <div className="w-full grid grid-cols-[auto_1fr_auto] justify-between px-6 gap-6 max-xs:px-2 max-xs:gap-2">
        <NavLink
          className={" w-fit px-4 max-xs:p-0 flex justify-center items-center"}
          to={-1}
        >
          <BsArrowLeft className="text-2xl max-xs:text-xl font-bold" />
        </NavLink>
        <input
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          type="text"
          placeholder="Search by subject names, tags, or keywords"
          className="w-full max-w-96 place-self-end bg-bg-sec-color rounded-sm outline-none border-none px-2 py-1 "
        />
        <button
          onClick={handleSearch}
          className="w-fit px-4 py-1 bg-accent-color text-lg cursor-pointer outline-none border-none rounded-sm max-xs:px-2 max-sm:py-0.5 max-xs:text-base"
        >
          Search
        </button>
      </div>
      {/* Search section  */}

      <section className="min-h-[60dvh]">
        {searchParams.get("q") === "" ? (
          <div className="w-full min-h-[60dvh] flex justify-center items-center">
            <CgSearch className="text-[10vw] max-sm:text-9xl text-text-muted opacity-50" />
          </div>
        ) : error ? (
          <Error error={error} setError={setError} />
        ) : !subjects ? null : subjects.length === 0 ? (
          <div className="min-h-[60dvh] w-full justify-center items-center flex">
            <p className="text-xl font-bold text-text-muted">No result found.</p>
          </div>
        ) : (
          <>
            {pagination && (
              <div className="mt-6 px-6">
                <p className="w-fit mb-4 bg-bg-sec-color px-2 border-l-4 text-lg border-l-border-color">
                  Showing result for : <b className="font-bold ">{searchParams.get("q")}</b>
                </p>
                <p  className="text-base w-fit">Total Result : {pagination.total}</p>
                <p  className="text-base w-fit">
                  Page: {pagination.page}/{pagination.totalPages}
                </p>
              </div>
            )}

            <div className="w-full py-4 grid grid-cols-[repeat(auto-fill,minmax(300px,300px))] gap-6 justify-center mt-10">
              {subjects.map((sub, index) => (
                <SubjectCard subject={sub} key={index} />
              ))}
            </div>
            {pagination && (
              <div className="w-full min-h-20 flex justify-center items-center gap-10 mt-10 relative">
                {pagination.hasPrev && (
                  <button
                    onClick={handlePrev}
                    className="text-base absolute top-1/2 right-1/2 -translate-y-1/2 -translate-x-10 bg-primary-color px-4 py-1 rounded-sm outline-none border-none cursor-pointer"
                  >
                    Prev
                  </button>
                )}
                {pagination.hasNext && (
                  <button
                    onClick={handleNext}
                    className="text-base absolute top-1/2 left-1/2 -translate-y-1/2 translate-x-10 bg-primary-color px-4 py-1 rounded-sm outline-none border-none cursor-pointer"
                  >
                    Next
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </section>

      {/* navbar  */}
      <Navbar/>
      {/* navbar  */}

      <Footer />
    </>
  );
}

export default Search;
