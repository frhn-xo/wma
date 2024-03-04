import React, { useState } from 'react';
import { io } from 'socket.io-client';
import CardTop from './CardTop';
import CardMain from './CardMain';
import EditProfile from './EditProfile';
import { useSelector, useDispatch } from 'react-redux';
import { IoMdRefresh } from 'react-icons/io';

const Card = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user.userData);

  const edit = useSelector((state) => state.user.edit);

  const [msg, setmsg] = useState({ show: false, text: '' });

  const fetchAttendance = () => {
    setmsg({ show: true, text: '' });
    const socket = io(import.meta.env.VITE_API_URL);
    try {
      socket.emit('details', userData);
      socket.on('scrp', (data) => {
        setmsg((p) => ({ ...p, text: data }));
      });
      socket.on('scrpErr', (data) => {
        socket.disconnect();
        console.log('Error during sign-in:', data);
        setmsg((p) => ({ ...p, text: data }));
      });
      socket.on('scrpSucc', (data) => {
        socket.disconnect();
        setmsg((p) => ({ ...p, text: data }));
      });
    } catch (error) {
      socket.disconnect();
      console.log('Error during sign-in:', error);
      setmsg((p) => ({ ...p, text: "Oops, I guess there's an error." }));
    }
  };

  return (
    <>
      {edit ? (
        <EditProfile />
      ) : (
        <div className="bg-black w-full p-5 rounded-md bg-opacity-80 flex flex-col font-semibold h-96">
          <CardTop />
          <CardMain />
          {msg.show && (
            <div className="my-4 w-full text-center text-slate-100 ">
              {msg.text}
            </div>
          )}
          {userData && (
            <div className="flex justify-between items-end my-4">
              <div className=" text-left w-fit">{userData?.collegeId}</div>
              <button
                className="p-2 bg-lime-300 text-black text-3xl rounded-full hover:bg-white font-bold mr-4"
                onClick={fetchAttendance}
              >
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
