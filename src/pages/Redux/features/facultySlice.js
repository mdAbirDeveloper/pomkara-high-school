const { createSlice } = require("@reduxjs/toolkit");

const facultySlice = createSlice({
  name: "faculty",
  initialState: {
    facultys: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchFacultyStart: (state) => {
      state.error = "";
      state.loading = true;
    },
    fetchFacultySuccess: (state, action) => {
      state.facultys = action.payload;
      state.loading = false;
    },
    fetchFacultyFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    approvefacultyStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    approvefacultySuccess: (state, action) => {
      state.facultys = state.facultys.map((faculty) =>
        faculty._id === action.payload._id
          ? { ...faculty, isApprove: true }
          : faculty
      );
      state.loading = false;
    },
    approvefacultyFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    unapprovefacultyStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    unapprovefacultySuccess: (state, action) => {
      state.facultys = state.facultys.map((faculty) =>
        faculty._id === action.payload._id
          ? { ...faculty, isApprove: false }
          : faculty
      );
      state.loading = false;
    },
    unapprovefacultyFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deletefacultyStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deletefacultySuccess: (state, action) => {
      state.facultys = state.facultys.filter(
        (faculty) => faculty._id !== action.payload._id
      );
      state.loading = false;
    },
    deletefacultyFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchFacultyStart,
  fetchFacultySuccess,
  fetchFacultyFailure,
  approvefacultyFailure,
  approvefacultyStart,
  approvefacultySuccess,
  deletefacultyFailure,
  deletefacultyStart,
  deletefacultySuccess,
  unapprovefacultyFailure,
  unapprovefacultyStart,
  unapprovefacultySuccess,
} = facultySlice.actions;

export default facultySlice.reducer;
