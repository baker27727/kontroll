import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import GetViolationsPayload from "../../interfaces/payloads/GetViolationsPayload";
import GetViolationsState from "../../interfaces/states/ViolationState";
import { baseUrl } from "../../configs/constants";
import axios from "axios";
import Violation from "../../interfaces/Violation";

const initialState: GetViolationsState = {
    violations: [],
    currentViolation: null,
    error: null,
    loading: false,
    status_code: null
  };
  
// Example async action using createAsyncThun
export const getAllViolations = createAsyncThunk('violation/getAllViolations',async () => {
    try {
        const response = await axios.get(`${baseUrl}/violations`);
        return {
            status_code: response.status,
            violations: response.data as Violation[]
        } as GetViolationsPayload;
    } catch(error) {
        console.error(error);
        throw error;
    }
}
);

export const getViolation = createAsyncThunk('violation/getViolation',async (id: number) => {
    try {
        const response = await axios.get(`${baseUrl}/violations/${id}`);
        console.log(response.data);
        
        return response.data
    } catch(error) {
        console.error(error);
        throw error;
    }
})
// Example async action using createAsyncThun
export const deleteViolation = createAsyncThunk('violation/delete',async (id: number) => {
    try {
        const response = await axios.delete(`${baseUrl}/violations/${id}`);
        return {
            status_code: response.status,
        } as GetViolationsPayload;
    } catch(error) {
        console.error(error);
        throw error;
    }
}
);

  const ViolationSlice = createSlice({
    name: 'violation',
    initialState,
    reducers: {
        setCurrentViolation(state,action){
            state.currentViolation = action.payload
        }
    },
    extraReducers: (builder) => {
      builder.addCase(getAllViolations.fulfilled, (state, action: PayloadAction<GetViolationsPayload>) => {
        state.violations = action.payload.violations
        state.loading = false
        state.error = null,
        state.status_code = action.payload.status_code
      });
  
      builder.addCase(getAllViolations.pending, (state) => {
          state.loading = true;
      });
  
      builder.addCase(getAllViolations.rejected, (state, action) => {
          state.error = action.error.message ?? ''
          state.loading = false
      });
      //delete logic
      builder.addCase(deleteViolation.fulfilled, (state, action: PayloadAction<GetViolationsPayload>) => {
        // setCurrentViolation(null)
        state.loading = false
        state.error = null,
        state.status_code = action.payload.status_code
      });
  
      builder.addCase(deleteViolation.pending, (state) => {
          state.loading = true;
      });
  
      builder.addCase(deleteViolation.rejected, (state, action) => {
          state.error = action.error.message ?? ''
          state.loading = false
      });

      builder.addCase(getViolation.fulfilled, (state, action) => {
        state.currentViolation = action.payload
        state.loading = false
        state.error = null,
        state.status_code = null
      });
  
      builder.addCase(getViolation.pending, (state) => {
          state.loading = true;
      });
  
      builder.addCase(getViolation.rejected, (state, action) => {
          state.error = action.error.message ?? ''
          state.loading = false
      });
    },
  });

  export const {setCurrentViolation} = ViolationSlice.actions
  
  export default ViolationSlice.reducer;
  