import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    attendanceData: null,
    edit: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.userData = { ...state.userData, ...action.payload };
    },
    setAttendance: (state, action) => {
      state.attendanceData = { ...state.attendanceData, ...action.payload };
    },
    toggleEdit: (state) => {
      state.edit = !state.edit;
    },
    removeUser: (state) => {
      state.userData = null;
      state.attendanceData = null;
    },
  },
});

export const { setUser, setAttendance, toggleEdit, removeUser } =
  userSlice.actions;
export default userSlice.reducer;
