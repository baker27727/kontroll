import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { baseUrl } from "../../configs/constants";
import AuthState from "../../interfaces/states/AuthState";
import LoginPayload from "../../interfaces/payloads/login_payload";
import LoginResponse from "../../interfaces/responses/LoginResponse";
import { provideAuthentication } from "../../utils/authentication";
import ApiError from "../../interfaces/ApiError";

export const loginPartner = createAsyncThunk('partners/login',async (payload: LoginPayload) => {
    try{
        const response = await axios.post(`${baseUrl}/auth/partners/login`, payload)
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
    partner: null,
}


const AuthSlice = createSlice({
    name: 'auth_slice',
    initialState,
    reducers: {
        logoutPartner: (state) => {
            state.token = null
            state.partner = null
            state.error = null
            state.loading = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginPartner.pending, (state) => {
            state.loading = true
            state.error = null
        })

        builder.addCase(loginPartner.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message as string
        })

        builder.addCase(loginPartner.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.partner = action.payload.partner
            state.token = action.payload.token
        })
    }
})


export default AuthSlice.reducer;
export const {logoutPartner} = AuthSlice.actions
