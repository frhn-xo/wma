import React from 'react';
import { useSelector } from 'react-redux';

const CardTop = () => {
  const attendanceData = useSelector((state) => state.user.attendanceData);
  return (
    <div className="flex justify-between text-md ">
      <div className=" text-left w-fit">{attendanceData?.pAttendance}</div>
      <div className="flex-col w-fit">
        {attendanceData?.scrpDate && (
          <>
            <div className=" text-right w-full">3 march sunday</div>
            <div className="text-right w-full">2:00 am</div>
          </>
        )}
      </div>
    </div>
  );
};

export default CardTop;
