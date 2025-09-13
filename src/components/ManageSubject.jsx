import { BiEdit } from "react-icons/bi";
import { FiDelete } from "react-icons/fi";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Error from "./Error";
import {
  addSubjectApi,
  deleteSubjectApi,
  getSubjectsListApi,
} from "../service/api";
import { CgClose } from "react-icons/cg";
import Success from "./Success";
import { VscLoading } from "react-icons/vsc";

function ManageUnit() {
  const [subjectName, setSubjectName] = useState("");
  const [tags, setTags] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const fileInput = useRef(null);
  const [isPending, setIsPending] = useState({
    isLoadingSubject: false,
    isAddingSubject: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [subjectList, setSubjectList] = useState(null);

  const handleTagsInput = (e) => {
    if (e.key === "Enter") {
      const tag = e.target.value;
      if (tag === "") return setError("Tag can not be empty.");
      setTags((prev) => [...prev, tag]);
      e.target.value = "";
    }
  };

  const handleKeywordsInput = (e) => {
    if (e.key === "Enter") {
      const keyword = e.target.value;
      if (keyword === "") return setError("Key can not be empty.");
      setKeywords((prev) => [...prev, keyword]);
      e.target.value = "";
    }
  };

  const handleAddSubject = async (e) => {
    e.preventDefault();
    try {
      if (subjectName === "") {
        return setError("Subject name can not be empty.");
      }
      setIsPending((prev) => ({ ...prev, isAddingSubject: true }));

      const formData = new FormData();
      formData.append("title", subjectName);
      formData.append("tags", JSON.stringify(tags));
      formData.append("keywords", JSON.stringify(keywords));
      if (fileInput.current && fileInput.current.files[0]) {
        formData.append("file", fileInput.current.files[0]);
      }


      const { data, error } = await addSubjectApi(formData);
      if (error) {
        return setError(error.message);
      }
      setSubjectName("");
      setTags([]);
      setKeywords([]);
      setSuccess(data.message);
      loadSubjectList();
    } catch (error) {
      setError(error.msg);
    } finally {
      setIsPending((prev) => ({ ...prev, isAddingSubject: false }));
    }
  };

  const loadSubjectList = useCallback(async () => {
    setIsPending((prev) => ({ ...prev, isLoadingSubject: true }));
    try {
      const { data, error } = await getSubjectsListApi();
      if (error) {
        return setError(error.message);
      }

      const list = data.data.list;
      setSubjectList([...list]);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsPending((prev) => ({ ...prev, isLoadingSubject: false }));
    }
  }, []);

  const deleteSubject = async (id) => {
    try {
      const { data, error } = await deleteSubjectApi(id);
      if (error) {
        setError(error.message);
      }
      setSuccess(data.message);
      loadSubjectList();
    } catch (error) {
      setError(error.message);
    }
  };

  // on first page load
  useEffect(() => {
    loadSubjectList();
  }, []);

  return (
    <div className="w-full p-4 mb-10 px-[5vw]">
      {success && <Success success={success} setSuccess={setSuccess} />}
      {error && <Error error={error} setError={setError} />}
      <div className="w-full flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight font-main">
          Manage Subject
        </h2>
      </div>

      <div className="w-full bg-surface-color p-4 mt-10">
        <h4 className="text-xl font-semibold py-6">Add Subject</h4>

        <div className=" w-full p-4 flex justify-center items-start flex-col gap-4">
          <input ref={fileInput} type="file" name="file" id="file" required={true} />
          <label htmlFor="name">Subject name</label>
          <input
            required
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            type="text"
            className="w-full bg-bg-color px-4 py-1 rounded-md outline-none border-2 border-border-color mb-2"
            placeholder="Input the Unit Name"
          />
          {/* tag input  */}
          <label htmlFor="tagInput">Tags:</label>
          <div className="bg-bg-color p-4 w-full flex justify-start flex-wrap items-center gap-1">
            {tags.map((tag, i) => (
              <span
                className="text-sm text-text-muted px-1 py-0.5  bg-surface-color flex justify-center items-center gap-1"
                key={i}
              >
                {tag}
                <button
                  onClick={() => {
                    const filteredTags = tags.filter((t) => t !== tag);
                    setTags([...filteredTags]);
                  }}
                  className="cursor-pointer border-none outline-none"
                >
                  <CgClose />
                </button>
              </span>
            ))}
            {tags.length < 5 && (
              <input
                id="tagInput"
                required
                type="text"
                onKeyUp={handleTagsInput}
                className="outline-none border-none"
                placeholder="Add tags (Max = 5)"
              />
            )}
          </div>
          {/* keyword input  */}
          <label htmlFor="keywordsInput">Keywords:</label>
          <div className="bg-bg-color p-4 w-full flex justify-start flex-wrap items-center gap-1">
            {keywords.map((keyword, i) => (
              <span
                className="text-sm text-text-muted px-1 py-0.5  bg-surface-color flex justify-center items-center gap-1"
                key={i}
              >
                {keyword}
                <button
                  onClick={() => {
                    const filteredKeywords = keywords.filter(
                      (t) => t !== keyword
                    );
                    setKeywords([...filteredKeywords]);
                  }}
                  className="cursor-pointer border-none outline-none"
                >
                  <CgClose />
                </button>
              </span>
            ))}
            {tags.length < 5 && (
              <input
                id="keywordsInput"
                required
                type="text"
                onKeyUp={handleKeywordsInput}
                className="outline-none border-none"
                placeholder="Add tags (Max = 5)"
              />
            )}
          </div>

          <button
            onClick={handleAddSubject}
            className="w-full text-base outline-none select-none font-semibold tracking-tight bg-primary-color text-bg-color px-4 py-1 rounded-md cursor-pointer"
          >
            {isPending.isAddingSubject ? (
              <VscLoading className="animate-spin" />
            ) : (
              "Add Subject"
            )}
          </button>
        </div>
      </div>

      <div className="w-full bg-surface-color p-4 mt-10">
        <h4 className="text-lg font-semibold py-6">All Subjects</h4>

        <div className="w-full grid grid-cols-2 py-6">
          <span className="place-self-start font-semibold tracking-tight">
            Subject Name
          </span>
          <span className="place-self-end font-semibold tracking-tight">
            Action
          </span>
        </div>

        {!subjectList ? (
          <VscLoading className="animate-spin" />
        ) : (
          subjectList.map((item) => (
            <div
              key={item._id}
              className="w-full grid grid-cols-2 py-3 border-t-2 border-white"
            >
              <span className="place-self-start">{item.title}</span>
              <span className="place-self-end flex justify-end gap-4 items-center">
                <button className="bg-bg-color text-text-muted flex justify-center items-center gap-2 px-2 py-0.5 border-[1px] border-text-muted text-sm cursor-pointer select-none outline-none rounded-sm">
                  <BiEdit /> Edit
                </button>
                <button
                  onClick={() => deleteSubject(item._id)}
                  className="bg-bg-color flex justify-center items-center gap-2 px-2 py-0.5 border-[1px] border-red-500 text-red-500 text-sm cursor-pointer select-none outline-none rounded-sm"
                >
                  <FiDelete /> Delete
                </button>
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ManageUnit;
