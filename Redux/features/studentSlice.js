// store/studentSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Create an API slice using RTK Query
export const studentApi = createApi({
  reducerPath: 'studentApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pomkara-high-school-server.vercel.app' }),
  endpoints: (builder) => ({
    loginStudent: builder.mutation({
      query: (credentials) => ({
        url: '/student/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

// Export the auto-generated hooks for login mutation
export const { useLoginStudentMutation } = studentApi;

// Create a student slice to store the student data
const studentSlice = createSlice({
  name: 'student',
  initialState: {
    student: null,
  },
  reducers: {
    setStudent: (state, action) => {
      state.student = action.payload;
      localStorage.setItem('student', state.student)
    },
    clearStudent: (state) => {
      state.student = null;
    },
  },
});

// Export actions
export const { setStudent, clearStudent } = studentSlice.actions;

export default studentSlice.reducer;
