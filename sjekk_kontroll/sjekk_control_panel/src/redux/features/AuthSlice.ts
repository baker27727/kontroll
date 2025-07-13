import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import ApiError from "../../interfaces/ApiError"
import { AxiosError } from "axios"
import axiosHttp from "../../utils/axios_client"
import { saveAuthenticationToken } from "../../utils/authentication"

export interface Manager {
    username: string
    role: 'admin' | 'superuser'
}

interface AuthState {
    isAuthenticated: boolean
    token: string | null,
    manager: Manager | null,
    isLoading: boolean
    error: string | null
}

const initialState: AuthState = {
    isAuthenticated: false,
    token: null,
    manager: null,
    isLoading: false,
    error: null
}

export const loginManager = createAsyncThunk(
    'manager/login',
    async (data: {
        username: string, 
        password: string
    }) => {
        try{
            const response = await axiosHttp.post('managers/login', {
                username: data.username, password: data.password
            })
            console.log(response.data);
            
            saveAuthenticationToken(response.data.token)

            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

export const createManager = createAsyncThunk(
    'manager/register',
    async (username, password) => {
        try{
            const response = await axiosHttp.post('managers', {
                username, password
            })

            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

const AuthSlice = createSlice({
    name: 'AuthSlice',
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(loginManager.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(loginManager.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })
        builder.addCase(loginManager.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = null
            state.manager = action.payload.manager
            state.token = action.payload.token
        })

        builder.addCase(createManager.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(createManager.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })
        builder.addCase(createManager.fulfilled, (state) => {
            state.isLoading = false
            state.error = null
        })
    },
})

export default AuthSlice.reducer