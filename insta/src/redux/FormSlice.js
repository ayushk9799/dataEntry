import {  createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../Data";
const initialState = {
 
  formData: {},
  
};
export const createAccount = createAsyncThunk(
    "form/update-form",
    async (payload, { getState, dispatch }) => {
      const { formData } = getState().form;
    //   const {data} = await axios.post(`${BACKEND_URL}/api/addData`, formData, {
    //     withCredentials: true,
    //   });
    //   dispatch(updateUserDetails(data.data));
    //   return data;

    console.log(formData)
    }
  );
const FromSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
   
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
  },
  
});
export const {updateFormData } = FromSlice.actions;

export default FromSlice.reducer;
