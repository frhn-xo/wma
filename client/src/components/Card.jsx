import React from 'react';
import CardTop from './CardTop';
import CardMain from './CardMain';
import EditProfile from './EditProfile';
import { useSelector } from 'react-redux';
import { IoMdRefresh } from 'react-icons/io';

const Card = () => {
  const userData = useSelector((state) => state.user.userData);
  const edit = useSelector((state) => state.user.edit);
  return (
    <>
      {edit ? (
        <EditProfile />
      ) : (
        <div className="bg-black w-full p-5 rounded-md bg-opacity-80 flex flex-col font-semibold h-96">
          <CardTop />
          <CardMain />
          <div className="my-4 w-full text-center text-slate-100 opacity-0">
            Navigating to website...
          </div>
          {userData && (
            <div className="flex justify-between items-end my-4">
              <div className=" text-left w-fit">{userData?.collegeId}</div>
              <button className="p-2 bg-lime-300 text-black text-3xl rounded-full hover:bg-white font-bold mr-4">
                <IoMdRefresh size={45} />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Card;
