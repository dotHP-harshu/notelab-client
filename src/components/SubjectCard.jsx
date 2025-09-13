import React from "react";
import { useNavigate } from "react-router";

function SubjectCard({ subject }) {
  const navigate = useNavigate();

  return (
    <div className="w-[300px] h-[250px] bg-surface-color border-l-6 border-border-color p-4 shrink-0 max-xs:scale-95 ">
      <div className="w-full flex justify-between items-center">
        <div className="subject-img w-16 h-16 overflow-hidden p-2 bg-bg-sec-color">
          <img
            src={
              subject.img
                ? `data:${
                    subject.img.contentType
                  };base64,${subject.img.data.toString("base64")}`
                : "/images/subject/sub-b.png"
            }
            alt="s-img"
            className="w-full object-center"
          />
        </div>

        <button
          onClick={() => navigate(`/subject/${subject._id}`)}
          className="text-lg bg-primary-color font-semibold tracking-wide cursor-pointer outline-none select-none rounded-sm px-4 py-1 border-none "
        >
          View
        </button>
      </div>

      <h3 className="mt-4 text-lg tracking-wide font-bold leading-none">
        {subject.title}
      </h3>

      <div className="w-full flex justify-start items-center gap-2 flex-wrap mt-4">
        {subject.tags.map((tag, i) => (
          <span
            key={i}
            className="text-sm text-text-muted px-2 py-1 border-2 border-text-muted leading-none w-fit rounded-full bg-bg-sec-color"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default SubjectCard;
