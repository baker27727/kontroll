import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { apiUrl } from "../../configs/constants";
import { provideAuthentication } from "../../utils/authentication";
import ApiError from "../../interfaces/ApiError";
import AuthState from "../../interfaces/states/AuthState";
import LoginResponse from "../../interfaces/responses/LoginResponse";
import LoginPayload from "../../interfaces/payloads/login_payload";

export const loginPlaceDashboard = createAsyncThunk('partners/login',async (payload: LoginPayload) => {
    try{
        const response = await axios.post(`${apiUrl}/auth/places/login`, payload)
        const data: LoginResponse = response.data
        
        provideAuthentication(data.token)

        return data
    }catch(error){
        throw ApiError.from(error as AxiosError)
    }
})

const initialState: AuthState = {
    loading: false,
    error: null,
    token: null,
    place_dashboard: null,
}


const AuthSlice = createSlice({
    name: 'auth_slice',
    initialState,
    reducers: {
        logoutPartner: (state) => {
            state.token = null
            state.place_dashboard = null
            state.error = null
            state.loading = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginPlaceDashboard.pending, (state) => {
            state.loading = true
            state.error = null
        })

        builder.addCase(loginPlaceDashboard.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message as string
        })

        builder.addCase(loginPlaceDashboard.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.place_dashboard = action.payload.place_dashboard
            state.token = action.payload.token
        })
    }
})


export default AuthSlice.reducer;
export const {logoutPartner} = AuthSlice.actions
