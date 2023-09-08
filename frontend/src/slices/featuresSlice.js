import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setHeaders, url } from './api';
import { toast } from 'react-toastify';

const initialState = {
  items: [],
  status: null,
  createStatus: null,
  editStatus: null,
  deleteStatus: null,
};

export const featuresFetch = createAsyncThunk(
  "features/featuresFetch",
  async () => {
    try {
      const response = await axios.get(`${url}/features`);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const featuresEdit = createAsyncThunk(
  "features/featuresEdit",
  async (values) => {
    try {
      const response = await axios.put(
        `${url}/features/${values.features._id}`,
        values,
        setHeaders()
      );

      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data, {
        position: "bottom-left",
      });
    }
  }
);

const featuresSlice = createSlice({
  name: "features",
  initialState,
  reducers: {},
  extraReducers: {
    [featuresFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [featuresFetch.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [featuresFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
    //   [productsCreate.pending]: (state, action) => {
    //     state.createStatus = "pending";
    //   },
    //   [productsCreate.fulfilled]: (state, action) => {
    //     state.items.push(action.payload);
    //     state.createStatus = "success";
    //     toast.success("Product Created!", {
    //       position: "bottom-left",
    //     });
    //   },
    //   [productsCreate.rejected]: (state, action) => {
    //     state.createStatus = "rejected";
    //   },
    //   [productDelete.pending]: (state, action) => {
    //     state.deleteStatus = "pending";
    //   },
    //   [productDelete.fulfilled]: (state, action) => {
    //     const newList = state.items.filter(
    //       (item) => item._id !== action.payload._id
    //     );
    //     state.items = newList;
    //     state.deleteStatus = "success";
    //     toast.error("Product Deleted!", {
    //       position: "bottom-left",
    //     });
    //   },
    //   [productDelete.rejected]: (state, action) => {
    //     state.deleteStatus = "rejected";
    //   },
    //   [productsEdit.pending]: (state, action) => {
    //     state.editStatus = "pending";
    //   },
    //   [productsEdit.fulfilled]: (state, action) => {
    //     const updatedProducts = state.items.map((product) =>
    //       product._id === action.payload._id ? action.payload : product
    //     );
    //     state.items = updatedProducts;
    //     state.editStatus = "success";
    //     toast.info("Product Edited", {
    //       position: "bottom-left",
    //     });
    //   },
    //   [productsEdit.rejected]: (state, action) => {
    //     state.editStatus = "rejected";
    //   },
  },
});

export const { addFeature } = featuresSlice.actions;
export default featuresSlice.reducer;