// featuredSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';
import { baseUrl } from "../../configs/constants";

interface ComplainState {
  loading: boolean;
  complaints_count: number;
  error: string | undefined;
}

export const getComplaintsCount = createAsyncThunk('Featured_products/getFeatured', async () => {
  try {
    const response = await axios.get(`${baseUrl}/complaints/count`);
    return response.data;
  } catch(error) {
    console.error(error);
    throw error;
  }
});

const initialState: ComplainState = {
  loading: false,
  complaints_count: 0,
  error: ""
};

const complaintsCountReducer = createSlice({
  name: "Featured",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getComplaintsCount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getComplaintsCount.fulfilled, (state, action: PayloadAction<number>) => {
      state.loading = false;
      state.complaints_count = action.payload;
      state.error = '';
    });
    builder.addCase(getComplaintsCount.rejected, (state, action) => {
      state.loading = false;
      state.complaints_count = 0;
      state.error = action.error.message ?? '';
    });
  }
});

export default complaintsCountReducer.reducer;
