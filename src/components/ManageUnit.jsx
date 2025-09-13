import { BiEdit } from "react-icons/bi";
import { FiDelete } from "react-icons/fi";
import React from "react";

function ManageUnit() {
  return (
    <div className="w-full p-4 mb-10 px-[5vw]">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight font-main">
          Manage Unit
        </h2>

        <select
          id="subject"
          className="bg-bg-color border border-border-color text-sm rounded-sm outline-none p-2.5 appearance-none cursor-pointer"
        >
          <option selected>All Subjects</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
      </div>

      <div className="w-full bg-surface-color p-4 mt-10">
        <h4 className="text-xl font-semibold py-6">Add Unit</h4>

        <form className=" w-full p-4 flex justify-center items-start flex-col gap-4">
          <label htmlFor="name">Unit name</label>
          <input
            type="text"
            className="w-full bg-bg-color px-4 py-1 rounded-md outline-none border-2 border-border-color mb-2"
            placeholder="Input the Unit Name"
          />
          <label htmlFor="subject">Subject</label>
          <select
            id="subject"
            className="bg-bg-color border border-border-color text-sm rounded-sm outline-none p-2.5 appearance-none cursor-pointer w-full"
          >
            <option selected>All Subjects</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>

          <button
            type="submit"
            className="w-full text-base outline-none select-none font-semibold tracking-tight bg-primary-color text-bg-color px-4 py-1 rounded-md cursor-pointer"
          >
            Add Unit
          </button>
        </form>
      </div>

      <div className="w-full bg-surface-color p-4 mt-10">
        <h4 className="text-lg font-semibold py-6">All Subjects</h4>

        <div className="w-full grid grid-cols-2 py-6">
          <span className="place-self-start font-semibold tracking-tight">
            Unit Name
          </span>
          <span className="place-self-end font-semibold tracking-tight">
            Action
          </span>
        </div>

        <div className="w-full grid grid-cols-2 py-6 border-t-2 border-white">
          <span className="place-self-start">Unit 1</span>
          <span className="place-self-end flex justify-end gap-4 items-center">
            <button className="bg-bg-color text-text-muted flex justify-center items-center gap-2 px-2 py-0.5 border-[1px] border-text-muted text-sm cursor-pointer select-none outline-none rounded-sm">
              <BiEdit /> Edit
            </button>
            <button className="bg-bg-color flex justify-center items-center gap-2 px-2 py-0.5 border-[1px] border-red-500 text-red-500 text-sm cursor-pointer select-none outline-none rounded-sm">
              <FiDelete /> Delete
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default ManageUnit;
