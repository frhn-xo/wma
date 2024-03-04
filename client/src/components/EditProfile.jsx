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
    data.collegeId = data.collegeId.toLowerCase();
    console.log(data);
    dispatch(setUser(data));
    dispatch(toggleEdit());
  };

  const clearDetails = () => {
    console.log('removeUser');
    dispatch(removeUser());
    setValue('collegeId', '');
    setValue('collegeKey', '');
  };

  return (
    <div className="bg-lime-300 text-black w-full p-5 rounded-md bg-opacity-90 flex flex-col font-semibold h-96">
      <div className="flex justify-between h-full mb-4">
        <div className="text-5xl">*details</div>
      </div>
      <form
        onSubmit={handleSubmit(submitDetails)}
        className="flex-col flex w-full caret-slate-100 jus"
      >
        <label htmlFor="collegeId" className="text-2xl">
          student roll:
        </label>
        <input
          type="text"
          name="collegeId"
          {...register('collegeId', {
            required: 'Student Roll is required',
            minLength: {
              value: 10,
              message: 'Student Roll must be exactly 10 characters',
            },
            maxLength: {
              value: 10,
              message: 'Student Roll must be exactly 10 characters',
            },
          })}
          className="bg-black rounded-lg text-2xl text-center p-3 text-lime-300 font-semibold  w-full focus-visible:ring-slate-100 focus-visible:ring-2"
        />
        {errors.collegeId && (
          <span className="text-xs  mt-1 text-right">
            {errors.collegeId.message}
          </span>
        )}
        <label htmlFor="collegeKey" className="text-2xl">
          password:
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
        <div className="flex justify-between mt-4 px-4 ">
          <button type="button" onClick={clearDetails}>
            <MdDeleteOutline size={45} />
          </button>
          <button className="p-4 bg-black text-lime-300 text-3xl rounded-full hover:bg-blue-900 font-bold mr-4 w-fit">
            <FaCheck size={30} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
