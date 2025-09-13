import React from "react";
import Header from "../components/Header";
import SubjectCard from "../components/SubjectCard";
import Navbar from "../components/Navbar";

function Bookmark() {
  return (
    <>
      <Header />
      {/* Bookmarks */}
      <section className="px-10">
        {/* header  */}
        <div className="w-full flex justify-between items-center py-6">
          <h3 className="text-3xl font-semibold tracking-tighter">Bookmarks</h3>
        </div>
        {/* header  */}
        {/* card-container  */}
        <div className="w-full py-4 grid grid-cols-[repeat(auto-fill,minmax(300px,300px))] gap-6 justify-center">
        </div>
        {/* card-container  */}
      </section>
      {/* Bookmarks */}

      {/* navbar */}
      <Navbar/>
      {/* navbar */}
    </>
  );
}

export default Bookmark;
