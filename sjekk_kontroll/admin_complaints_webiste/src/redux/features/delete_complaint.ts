// deleteComplaintSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { baseUrl } from "../../configs/constants";

interface DeleteComplaintState {
  loading: boolean;
  error: string;
}

export const deleteComplaint = createAsyncThunk<void, number>(
  'Complaints/deleteComplaint',
  async (payload) => {
    try {
      const response = await axios.delete(`${baseUrl}/complaints/${payload}`);
      console.log(response.status);
      
    } catch (error) {
        throw error as Error;
    }
  }
);

const initialState: DeleteComplaintState = {
  loading: false,
  error: "",
};

const deleteComplaintReducer = createSlice({
  name: "Complaints",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteComplaint.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteComplaint.fulfilled, (state) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(deleteComplaint.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Error deleting complaint';
    });
  }
});

export default deleteComplaintReducer.reducer;
