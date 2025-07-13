import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios"
import { apiUrl } from "../../constants/app_constants"
import ApiError from "../../interfaces/ApiError"
import Apartment from "../../interfaces/Apartment"
import { checkAuthentication, getApartmentData, getAuthenticationToken, removeApartmentData, removeAuthenticationToken, saveApartmentData, saveAuthenticationToken } from "../../utils/authentication"



interface AuthState {
    apartment: Apartment | null
    isAuthenticated: boolean
    token: string | null
    isLoading: boolean
}

const initialState: AuthState = {
    apartment: null,
    isAuthenticated: false,
    token: null,
    isLoading: false
}

interface LoginApartmentPayload {
    access_username: string
    access_password: string
}

export const loginApartment = createAsyncThunk(
    'auth/loginApartment',
    async (data: LoginApartmentPayload) => {
        try{
            const response = await axios.post(`${apiUrl}/auth/apartments/login`, data)
            saveApartmentData(response.data.apartment as Apartment)
            saveAuthenticationToken(response.data.token as string)
            return response.data
        }catch(err){
            console.log(err);
            
            throw ApiError.from(err as AxiosError)
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        initializeApartment: (state) => {
            state.apartment = getApartmentData()
            state.token = getAuthenticationToken()
            state.isAuthenticated = checkAuthentication()
            state.isLoading = false
            
        },

        logout: (state) => {
            state.apartment = null
            state.token = null
            state.isAuthenticated = false
            state.isLoading = false
            removeApartmentData()
            removeAuthenticationToken()
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginApartment.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginApartment.fulfilled, (state, action) => {
                state.isLoading = false
                state.isAuthenticated = true
                state.apartment = action.payload.apartment
            })
            .addCase(loginApartment.rejected, (state) => {
                state.isLoading = false
                state.isAuthenticated = false
                state.apartment = null
            })
    }
})

export const { initializeApartment, logout } = authSlice.actions

export default authSlice.reducer