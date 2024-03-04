import React from 'react';
import { useSelector } from 'react-redux';

const CardTop = () => {
  const attendanceData = useSelector((state) => state.user.attendanceData);
  const { scrpDate, scrpTime } = attendanceData || {};
  return (
    <div className="flex justify-between text-md ">
      <div className=" text-left w-fit">p {attendanceData?.pAttendance}</div>
      <div className="flex-col w-fit">
        {scrpDate && scrpTime && (
          <>
            <div className=" text-right w-full">{scrpDate}</div>
            <div className="text-right w-full">{scrpTime}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default CardTop;
