import React from "react";

function Logo({ size }) {
  return (
    <div className={`w-fit h-fit`}>
      {/* <span
        style={{ fontSize: `${size}px` }}
        className={`px-1 font-bold tracking-wide`}
      >
        Note
      </span>
      <span
        style={{ fontSize: `${size}px` }}
        className={`px-2 pb-1 text-bg-color bg-primary-color rounded-sm font-bold tracking-wide`}
      >
        lab
      </span> */}

        <img src="/images/logo.svg" alt="logo" style={{height:`${size}px`}} />
      
    </div>
  );
}

export default Logo;
