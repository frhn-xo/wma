import React from 'react';

const Foot = () => {
  return (
    <div className="flex text-xs ">
      <div className="flex w-full justify-start items-start flex-col">
        <span>wrapper abstraction over </span>
        <a
          href={import.meta.env.VITE_VIIT_URL}
          target="_black"
          className="underline"
        >
          vignan's attendance portal
        </a>
      </div>
      <div className="flex w-full justify-end items-end flex-col">
        <span>developed by</span>
        <a
          href={import.meta.env.VITE_FRHN_URL}
          target="_blank"
          className="underline"
        >
          frhn.xo
        </a>
      </div>
    </div>
  );
};

export default Foot;
