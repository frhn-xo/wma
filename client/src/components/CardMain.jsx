import React from 'react';
import { useSelector } from 'react-redux';
import { separateIntegerAndDecimal } from '../utils/utils';

const CardMain = () => {
  const attendanceData = useSelector((state) => state.user.attendanceData);
  const userData = useSelector((state) => state.user.userData);

  const { intStr, decStr } = separateIntegerAndDecimal(
    attendanceData?.attendance || '0.00'
  );

  return (
    <div className="my-4">
      {attendanceData?.attendance ? (
        <div className="flex text-slate-100 mt-5">
          <div className="text-9xl">{intStr}</div>
          <div className="py-3">
            <div className="text-5xl">{decStr}</div>
          </div>
        </div>
      ) : userData ? (
        <div className="flex text-slate-100 items-center mt-10">
          <div className="text-7xl pr-4">{':)'}</div>
          <div className="text-2xl flex-col">
            <div>ayo, let's go!</div>
            <div className="text-lime-300 text-sm">
              {'( bottom fetch button )'}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex text-slate-100 items-center mt-10">
          <div className="text-7xl pr-4">{':('}</div>
          <div className="text-2xl flex-col">
            <div>enter yo details</div>
            <div className="text-lime-300 text-sm">
              {'( top right edit button )'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardMain;
