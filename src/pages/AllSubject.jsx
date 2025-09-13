import React, { useCallback, useEffect, useState } from "react";
import Header from "../components/Header";
import SubjectCard from "../components/SubjectCard";
import Navbar from "../components/Navbar";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate, useSearchParams } from "react-router";
import { getSubjectsApi } from "../service/api";
import Loader from "../components/Loader";
import Error from "../components/Error";

function AllSubject() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [subjects, setSubjects] = useState(null);
  const [pagination, setPagination] = useState(null);
  const page = Number(searchParams.get("page")) || 1;
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getSubjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await getSubjectsApi(page, 5);

      if (error) {
        return setError(error.message);
      }
      const loadedSubjects = data?.data?.subjects;

      setSubjects([...loadedSubjects]);
      setPagination(data?.data?.pagination);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  });

  const handlePrev = () => {
    const prevPage = page - 1;
    navigate(`/all-subjects?page=${prevPage}`);
  };
  const handleNext = () => {
    const nextPage = page + 1;
    navigate(`/all-subjects?page=${nextPage}`);
  };

  useEffect(() => {
    getSubjects();
  }, [page]);

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

      {error && <Error setError={setError} error={error} />}
      <div className="pl-6">
        <span className="cursor-pointer" onClick={() => navigate(-1)}>
          <BsArrowLeft size={30} />
        </span>
      </div>
      {/* all subjects */}
      <section className="px-10">
        {/* header  */}
        <div className="w-full flex justify-between items-center py-6">
          <h3 className="text-3xl font-semibold tracking-tighter">
            All Subjects
          </h3>
        </div>
        {/* header  */}

        {pagination && (
          <div className="px-6 flex justify-center items-end flex-col">
            <p className="text-base w-fit">
              Total subjects : {pagination.total}
            </p>
            <p className="text-base w-fit">
              Page: {pagination.page}/{pagination.totalPages}
            </p>
          </div>
        )}

        {/* card-container  */}
        {subjects && (
          <>
            <div className="w-full py-4 grid grid-cols-[repeat(auto-fill,minmax(300px,300px))] gap-6 justify-center mt-10">
              {subjects.length === 0 ? (
                <div className="min-h-[60dvh] w-full justify-center items-center flex">
                  <p className="text-xl font-bold text-text-muted">
                    No result found.
                  </p>
                </div>
              ) : (
                subjects.map((sub, index) => (
                  <SubjectCard subject={sub} key={sub._id} />
                ))
              )}
            </div>
            {pagination && (
              <div className="w-full min-h-20 flex justify-center items-center gap-10 mt-4 relative">
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
        {/* card-container  */}
      </section>
      {/* all subjects */}

      {/* navbar */}
      <Navbar />
      {/* navbar */}
    </>
  );
}

export default AllSubject;
