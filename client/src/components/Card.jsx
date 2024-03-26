import React, { useState } from 'react';
import { io } from 'socket.io-client';
import CardTop from './CardTop';
import CardMain from './CardMain';
import EditProfile from './EditProfile';
import { useSelector, useDispatch } from 'react-redux';
import { IoMdRefresh } from 'react-icons/io';
import { FaBoltLightning } from 'react-icons/fa6';
import { getDateTime } from '../utils/utils';
import { setAttendance } from '../redux/userSlice';

const Card = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user.userData);

  const attendanceData = useSelector((state) => state.user.attendanceData);

  const edit = useSelector((state) => state.user.edit);

  const [msg, setmsg] = useState({ show: false, text: '' });

  const [btn, setBtn] = useState(false);

  const fetchAttendance = () => {
    setBtn(true);
    setmsg({ show: true, text: 'Please wait, connecting' });
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
        setBtn(false);
      });

      socket.on('scrpSucc', (data) => {
        socket.disconnect();
        setmsg((p) => ({ ...p, text: 'Success...' }));

        const dateTime = getDateTime();

        const newAttendanceData = {
          attendance: data,
          scrpDate: dateTime.formattedDate,
          scrpTime: dateTime.formattedTime,
          pAttendance: attendanceData?.attendance || '*',
        };

        console.log('newAttendanceData:', newAttendanceData);

        dispatch(setAttendance(newAttendanceData));

        setBtn(false);
      });
    } catch (error) {
      socket.disconnect();
      console.log('Error during sign-in:', error);
      setmsg((p) => ({ ...p, text: "Oops, I guess there's an error." }));
      setBtn(false);
    }
  };

  return (
    <>
      {edit ? (
        <EditProfile />
      ) : (
        <div className="bg-black w-full p-5 rounded-md bg-opacity-80 flex flex-col font-semibold h-96 justify-between">
          <CardTop />
          <CardMain />
          <div className="w-full text-center text-slate-100">{msg.text}</div>
          <div className="h-full">
            {userData && (
              <div className="flex justify-between items-end h-full">
                <div className=" text-left w-fit">{userData?.collegeId}</div>
                {!btn ? (
                  <button
                    className="p-2 bg-lime-300 text-black rounded-full font-bold mr-4 w-16 h-16 flex justify-center items-center hover:bg-slate-100"
                    onClick={fetchAttendance}
                  >
                    <IoMdRefresh size={45} />
                  </button>
                ) : (
                  <button className="p-2 bg-slate-100 text-black rounded-full font-bold mr-4 w-16 h-16 flex justify-center items-center">
                    <FaBoltLightning size={37} />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
