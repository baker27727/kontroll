// deleteComplaintSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from 'axios';
import { baseUrl } from "../../configs/constants";
import Manager from "../../interfaces/Manager";
import { provideAuthentication } from "../../utils/authentication";

interface LoginState {
  loading: boolean;
  error: string | null;
  manager: Manager | null,
  token: string | null
}

interface LoginPayload{
    username: string
    password: string
}

export const loginManager = createAsyncThunk<LoginPayloadAction, LoginPayload>(
  'Managers/login',
  async (payload) => {
    // console.log(payload);
    
    try {
      const response = await axios.post(`${baseUrl}/managers/login`,{
        username: payload.username,
        password: payload.password
      });
      
      provideAuthentication((response.data as LoginPayloadAction).token)

      
      return response.data;
      
    } catch (error) {
        console.log((error as AxiosError)?.response?.data);
        
        throw new Error(`${((error as AxiosError).response.data as {error:string}).error}`) 
    }
  }
);

const initialState: LoginState = {
  loading: false,
  error: null,
  token: null,
  manager: null
};

interface LoginPayloadAction{
    manager: Manager,
    token: string
}

const managerLoginReducer = createSlice({
  name: "Complaints",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginManager.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginManager.fulfilled, (state, action: PayloadAction<LoginPayloadAction>) => {
      state.loading = false
      state.error = null
      state.manager = action.payload.manager
      state.token = action.payload.token

    });
    builder.addCase(loginManager.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Error Login';
    });
  }
});

export default managerLoginReducer.reducer;
