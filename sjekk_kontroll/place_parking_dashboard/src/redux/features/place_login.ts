// deleteComplaintSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from 'axios';
import { apiUrl } from "../../configs/constants";
import { provideAuthentication } from "../../utils/authentication";
import ApiError from "../../interfaces/ApiError";
import PlaceDashboard from "../../interfaces/PlaceDashboard";

interface LoginState {
  loading: boolean;
  error: string | null;
  place_profile: PlaceDashboard | null,
  token: string | null
}

interface LoginPayload{
    access_code: string
    id: string
}

export const loginPlace = createAsyncThunk<LoginPayloadAction, LoginPayload>(
  'places/login',
  async (payload) => {
    // console.log(payload);
    
    try {
      const response = await axios.post(`${apiUrl}/places/${payload.id}/login`,{
        access_code: payload.access_code,
      });
      
      provideAuthentication((response.data as LoginPayloadAction).token)

      
      return response.data;
      
    } catch (error) {
        throw ApiError.from(error as AxiosError)
    }
  }
);

const initialState: LoginState = {
  loading: false,
  error: null,
  token: null,
  place_profile: null
};

interface LoginPayloadAction{
    token: string,
    place_profile: PlaceDashboard
}

const PlaceLoginSlice = createSlice({
  name: "Place_Login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginPlace.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginPlace.fulfilled, (state, action: PayloadAction<LoginPayloadAction>) => {
      state.loading = false
      state.error = null
      state.place_profile = action.payload.place_profile
      state.token = action.payload.token

    });
    builder.addCase(loginPlace.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Error Login';
    });
  }
});

export default PlaceLoginSlice.reducer;
