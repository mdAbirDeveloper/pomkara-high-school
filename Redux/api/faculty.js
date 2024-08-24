import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchFacultyFailure, fetchFacultyStart, fetchFacultySuccess } from "../features/facultySlice";



export const fetchFacultyData = () => {
    return (dispatch) => {
      dispatch(fetchFacultyStart());
      
      fetch('http://localhost:5000/faculty') // Adjust the URL to your API endpoint
        .then((response) => response.json())
        .then((data) => {
          dispatch(fetchFacultySuccess(data));
        })
        .catch((error) => {
          dispatch(fetchFacultyFailure(error.message));
        });
    };
  };


  
export const approveFaculty = createAsyncThunk(
    'faculty/approve',
    async (facultyId) => {
      const response = await fetch(`http://localhost:5000/facultys/approve/${facultyId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to unapprove teacher');
      }
  
      dispatch(fetchFacultyData());
  
      return await response.json();
    }
  );
  
  export const unapproveFaculty = createAsyncThunk(
    'faculty/unapprovefaculty',
    async (facultyId, { dispatch }) => {
      const response = await fetch(`http://localhost:5000/facultys/unapprove/${facultyId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to unapprove teacher');
      }
  
      dispatch(fetchFacultyData());
  
      return await response.json();
    }
  );
  
  
  // New Thunk for deleting a teacher
  export const deletefaculty = createAsyncThunk(
    'faculty/deletefaculty',
    async (facultyId, { dispatch }) => {
      const response = await fetch(`http://localhost:5000/facultys/${facultyId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete teacher');
      }
  
      dispatch(fetchFacultyData()); // Refetch data after deletion
  
      return await response.json();
    }
  );
  