import React from 'react';
import { useForm } from 'react-hook-form';
import { FaCheck } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, toggleEdit, removeUser } from '../redux/userSlice';
import { MdDeleteOutline } from 'react-icons/md';

const EditProfile = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.userData);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    defaultValues: { ...user },
  });

  const submitDetails = (data) => {
    data.collegeId = data.collegeId.replace(/\s/g, '').toLowerCase();
    data.collegeKey = data.collegeKey.trim();
    dispatch(setUser(data));
    dispatch(toggleEdit());
  };

  const clearDetails = () => {
    console.log('removeUser');
    dispatch(removeUser());
    setValue('collegeId', '');
    setValue('collegeKey', '');
  };

  const validateCollegeId = (value) => {
    const trimmedValue = value.replace(/\s/g, '');
    return (
      trimmedValue.length === 10 || 'Student Roll must be exactly 10 characters'
    );
  };

  return (
    <div className="bg-lime-300 text-black w-full p-5 rounded-md bg-opacity-90 flex flex-col font-semibold h-96">
      <div className="flex justify-between h-20">
        <div className="text-5xl">details</div>
      </div>
      <form
        onSubmit={handleSubmit(submitDetails)}
        className="flex-col flex w-full caret-slate-100"
      >
        <label htmlFor="collegeId" className="text-2xl">
          student roll
        </label>
        <input
          type="text"
          name="collegeId"
          {...register('collegeId', {
            required: 'Student Roll is required',
            validate: validateCollegeId,
          })}
          className="bg-black rounded-lg text-2xl text-center p-3 text-lime-300 font-semibold  w-full focus-visible:ring-slate-100 focus-visible:ring-2"
        />
        {errors.collegeId && (
          <span className="text-xs  mt-1 text-right">
            {errors.collegeId.message}
          </span>
        )}
        <label htmlFor="collegeKey" className="text-2xl">
          password
          <span className="text-sm">{`( same as vignan's portal )`}</span>
        </label>
        <input
          type="text"
          name="collegeKey"
          {...register('collegeKey', {
            required: 'Password is required',
          })}
          className="bg-black rounded-lg text-2xl text-center p-3 text-lime-300 font-semibold  w-full "
        />
        {errors.collegeKey && (
          <span className="text-xs  mt-1 text-right">
            {errors.collegeKey.message}
          </span>
        )}
        <div className="flex justify-between mt-3.5 ">
          <button type="button" onClick={clearDetails}>
            {/* <MdDeleteOutline size={45} /> */}
          </button>
          <button className="p-4 bg-black text-lime-300 text-3xl rounded-lg hover:bg-blue-900 font-bold  w-fit mt-5 mr-1">
            <FaCheck size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
