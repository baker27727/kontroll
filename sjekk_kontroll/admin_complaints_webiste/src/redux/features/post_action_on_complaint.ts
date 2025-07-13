// deleteComplaintSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { baseUrl } from "../../configs/constants";

interface DeleteComplaintState {
  loading: boolean;
  error: string;
}

interface PostComplaintActionPayload{
    message: string,
    status: 'pending'| 'completed'| 'rejected'| 'deleted',
    id: string
}

export const postActionOnComplaint = createAsyncThunk<void, PostComplaintActionPayload>(
  'Complaints/deleteComplaint',
  async (payload) => {
    try {
      const response = await axios.post(`${baseUrl}/complaints/${payload.id}/action`,{
        message: payload.message,
        status: payload.status
      });
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

const postActionOnComplaintReducer = createSlice({
  name: "Complaints",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postActionOnComplaint.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postActionOnComplaint.fulfilled, (state) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(postActionOnComplaint.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Error deleting complaint';
    });
  }
});

export default postActionOnComplaintReducer.reducer;
