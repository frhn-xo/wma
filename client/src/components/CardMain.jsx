import React from 'react';
import { useSelector } from 'react-redux';

const CardMain = () => {
  const attendanceData = useSelector((state) => state.user.attendanceData);
  const userData = useSelector((state) => state.user.userData);
  return (
    <div className="my-4">
      {attendanceData?.attendance ? (
        <div className="flex text-slate-100 mt-5">
          <div className="text-9xl">85</div>
          <div className="py-3">
            <div className="text-5xl">.05%</div>
            {/* <div className="text-5xl">%</div> */}
          </div>
        </div>
      ) : userData ? (
        <div className="flex text-slate-100 items-center mt-10">
          <div className="text-7xl pr-4">{':)'}</div>
          <div className="text-2xl">Ayo</div>
        </div>
      ) : (
        <div className="flex text-slate-100 items-center mt-10">
          <div className="text-7xl pr-4">{':('}</div>
          <div className="text-2xl">Enter yo details</div>
        </div>
      )}
    </div>
  );
};

export default CardMain;
