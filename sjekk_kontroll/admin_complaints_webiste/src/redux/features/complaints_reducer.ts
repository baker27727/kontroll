// featuredSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';
import { baseUrl, sjekkBaseUrl } from "../../configs/constants";
import Complaint from "../../interfaces/Complaint";
import Ticket from "../../interfaces/Ticket";

interface ComplainState {
  loading: boolean;
  complaints: Complaint[];
  error: string | null;

  current_complaint : Complaint | null
  current_ticket : Ticket | null
}

export const getFeatured = createAsyncThunk('Featured_products/getFeatured', async () => {
  try {
    const response = await axios.get(`${baseUrl}/complaints`);
    
    return response.data;
  } catch(error) {
    console.error(error);
    throw error;
  }
});

export const getCurrentComplaintTicket = createAsyncThunk('Featured_products/getCurrentComplaintTicket', async (id: string) => {
  try {
    const response = await axios.get(`${sjekkBaseUrl}/violations/number/${id}`);
    console.log(response);
    
    
    return response.data as Ticket;
  } catch(error) {
    console.error(error);
    throw error;
  }
})

const initialState: ComplainState = {
  loading: false,
  complaints: [],
  error: null,

  current_complaint : null,
  current_ticket : null
};

const complaintsReducer = createSlice({
  name: "Featured",
  initialState,
  reducers: {
    setCurrentComplaint(state, action: PayloadAction<Complaint>) {
      state.current_complaint = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getFeatured.pending, (state) => {
      state.loading = true;
      state.error = null
    });
    builder.addCase(getFeatured.fulfilled, (state, action: PayloadAction<Complaint[]>) => {
      state.error = null
      state.loading = false;
      state.complaints = action.payload;
    });
    builder.addCase(getFeatured.rejected, (state, action) => {
      state.loading = false;
      state.complaints = [];
      state.error = action.error.message ?? '';
    });

    builder.addCase(getCurrentComplaintTicket.pending, (state) => {
      state.loading = true;
      state.error = null
    });

    builder.addCase(getCurrentComplaintTicket.fulfilled, (state, action: PayloadAction<Ticket>) => {
      state.error = null
      state.loading = false;
      state.current_ticket = action.payload
    });

    builder.addCase(getCurrentComplaintTicket.rejected, (state, action) => {
      state.loading = false;
      state.complaints = [];
      state.error = action.error.message ?? '';
    });
  }
});

export default complaintsReducer.reducer;

export const { setCurrentComplaint } = complaintsReducer.actions