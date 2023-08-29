import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { url } from './api';

const initialState = {
    items: [],
    status: null,
    createStatus: null,
    editStatus: null,
    deleteStatus: null,
  };

export const categoryFetch = createAsyncThunk(
    "category/categoryFetch",
    async () => {
      try {
        const response = await axios.get(`${url}/category`);
  
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }
  );

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: {
    [categoryFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [categoryFetch.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [categoryFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
  }
});

export const { addCategory } = categorySlice.actions;
export default categorySlice.reducer;