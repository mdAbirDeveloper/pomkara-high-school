import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counterSlice"
import  userReducer  from "../features/userSlice";
import teacherReducer from "../features/teacherSlice";
import { thunk } from "redux-thunk";
import facultyReducer from "../features/facultySlice";
import studentReducer, { studentApi } from "../features/studentSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    teacher: teacherReducer,
    faculty: facultyReducer,
    student: studentReducer,
    // Add the API slice reducer
    [studentApi.reducerPath]: studentApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(thunk),
})