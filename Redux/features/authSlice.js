import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    student: null,
  },
  reducers: {
    login: (state, action) => {
      state.student = action.payload;
    },
    logout: (state) => {
      state.student = null;
      localStorage.removeItem("student"); // Clear local storage on logout
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
