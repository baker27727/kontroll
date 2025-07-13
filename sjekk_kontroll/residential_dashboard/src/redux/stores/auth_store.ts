// src/features/counter/counterSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type LoginPayload from '../../interfaces/payloads/login_payload';
import axiosClient from '../../utils/axios_client';
import ApiError from '../../interfaces/ApiError';
import type { AxiosError } from 'axios';
import { getAuthenticationToken, provideAuthenticationToken, removeAuthenticationToken, removeDashboard, saveDashboard } from '../../utils/authentication';
import AuthState from '../../interfaces/states/auth_state';
import Dashboard from '../../interfaces/Dashboard';

const initialState: AuthState = {
    isAuthenticated: false,
    token: null,
    dashboard: null,
    loading: false,
    error: null,
    status_code: null
};

export const loginDashboard = createAsyncThunk(
    'auth/login',
    async (payload: LoginPayload) => {
        try{
            const response = await axiosClient.post('residential-dashboards/login', payload)
            provideAuthenticationToken(response.data.token, true)
            saveDashboard(response.data.dashboard as Dashboard, true)

            console.log(response.data);
            
            return response.data


        }catch(error){
            console.log(error);
            
            throw ApiError.from(error as AxiosError)
        }
    }
)

export const verifyToken = createAsyncThunk(
    'auth/verify',
    async () => {
        try{
            const token = getAuthenticationToken()
            const response = await axiosClient.post('managers/verify-token', {
                token
            })
            
            return response.data

        }catch(error){
            console.log(error);
            
            throw ApiError.from(error as AxiosError)
        }
    }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    logout: (state) => {
        state.isAuthenticated = false
        state.token = null
        state.dashboard = null

        removeAuthenticationToken(true)
        removeDashboard(true)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginDashboard.pending, (state) => {
        state.loading = true        
    })      

    builder.addCase(loginDashboard.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.isAuthenticated = true
        state.token = action.payload.token
        state.dashboard = action.payload.dashboard

        console.log(action.payload);
        
    })

    builder.addCase(loginDashboard.rejected, (state, action) => {
        state.loading = false
        state.isAuthenticated = false
        state.token = null
        state.error = action.error.message as string
    })
  }
});

export default authSlice.reducer;

export const { logout } = authSlice.actions