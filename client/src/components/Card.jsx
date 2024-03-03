import React from 'react';
import CardTop from './CardTop';
import CardMain from './CardMain';

const Card = () => {
  return (
    <div className="bg-black w-full p-5 rounded-md bg-opacity-80 flex flex-col font-semibold">
      <CardTop />
      <CardMain />
      <div className="my-4 w-full text-center text-slate-100">
        Navigating to website...
      </div>
      <div className="flex justify-between items-end my-4">
        <div className=" text-left w-fit">
          <div>21l31a0552</div>
        </div>
        <button className="p-2 bg-lime-300 text-black px-6 text-3xl rounded-full hover:bg-white font-bold">
          fetch
        </button>
      </div>
    </div>
  );
};

export default Card;
