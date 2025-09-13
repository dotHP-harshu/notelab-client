import React, { useState } from 'react'
import { useNavigate } from 'react-router';

const unitImgType = ["a", "b", "c"]

const imgCount = {
  a:6,
  b:6,
  c:6
}

const getRandomNumber = (max) => {
  return Math.floor(Math.random() * max) + 1;
};

function UnitCard({ unit, imgType }) {
  const navigate = useNavigate();
  return (
    <div>
      <div className="w-[200px] h-[300px] overflow-hidden  border-2 border-border-color rounded-md flex flex-col justify-between items-center max-xs:scale-95">
        <div className="h-[200px] p-4 flex justify-center items-center">
          <img
            src={`/images/unit/pdf-${imgType}-${getRandomNumber(6)}.png`}
            alt="unit-img"
            className="w-1/2 object-contain"
          />
        </div>
        <div className="w-full h-[100px] flex flex-col justify-evenly items-start px-4">
          <h4 className="text-xl w-full font-semibold tracking-tight overflow-hidden text-ellipsis whitespace-nowrap">
            {unit.name}
          </h4>
          <div
            onClick={() => navigate(`/pdf/${unit._id}`)}
            className="mb-1 outline-none select-none text-lg font-semibold tracking-tight bg-primary-color text-bg-color px-2 py-0.5 rounded-md cursor-pointer"
          >
            View
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnitCard
