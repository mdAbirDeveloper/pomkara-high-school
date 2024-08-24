
import { fetchTeachersFailure, fetchTeachersStart, fetchTeachersSuccess } from '../features/teacherSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTeacherData = () => {
  return (dispatch) => {
    dispatch(fetchTeachersStart());
    
    fetch('https://pomkara-high-school-server.vercel.app/teachers') // Adjust the URL to your API endpoint
      .then((response) => response.json())
      .then((data) => {
        dispatch(fetchTeachersSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchTeachersFailure(error.message));
      });
  };
};

export const approveTeacher = createAsyncThunk(
  'teacher/approve',
  async (teacherId) => {
    const response = await fetch(`https://pomkara-high-school-server.vercel.app/teachers/approve/${teacherId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to unapprove teacher');
    }

    dispatch(fetchTeacherData());

    return await response.json();
  }
);

export const unapproveTeacher = createAsyncThunk(
  'teacher/unapproveTeacher',
  async (teacherId, { dispatch }) => {
    const response = await fetch(`https://pomkara-high-school-server.vercel.app/teachers/unapprove/${teacherId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to unapprove teacher');
    }

    dispatch(fetchTeacherData());

    return await response.json();
  }
);


// New Thunk for deleting a teacher
export const deleteTeacher = createAsyncThunk(
  'teacher/deleteTeacher',
  async (teacherId, { dispatch }) => {
    const response = await fetch(`https://pomkara-high-school-server.vercel.app/teachers/${teacherId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete teacher');
    }

    dispatch(fetchTeacherData()); // Refetch data after deletion

    return await response.json();
  }
);
