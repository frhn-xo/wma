import React from 'react';

const Head = () => {
  return (
    <div className="font-semibold text-4xl flex justify-between ">
      <div className="w-fit">"what's my attendance ?"</div>
      <button className="bg-lime-300 w-14 rounded-full h-12 text-black text-sm flex justify-center items-center hover:bg-white">
        edit
      </button>
    </div>
  );
};

export default Head;
