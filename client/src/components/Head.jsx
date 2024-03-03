import React from 'react';
import { AiOutlineEdit } from 'react-icons/ai';

const Head = () => {
  return (
    <div className="font-semibold text-4xl flex justify-between ">
      <div className="w-fit">"what's my attendance ?"</div>
      <button className="bg-lime-300 w-14 rounded-full h-12 text-black text-sm flex justify-center items-center hover:bg-white">
        <AiOutlineEdit size={30} />
      </button>
    </div>
  );
};

export default Head;
