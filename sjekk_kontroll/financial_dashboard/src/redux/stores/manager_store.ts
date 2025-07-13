import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type Manager from "../../interfaces/Manager";
import type ManagerState from "../../interfaces/states/manager_state";
import axiosClient from "../../utils/axios_client";
import { AxiosError } from "axios";
import ApiError from "../../interfaces/ApiError";
import CreateManagerPayload from "../../interfaces/payloads/create_manager_payload";


const initialState: ManagerState = {
    managers: [],
    current_manager: null,
    loading: false,
    error: null,
    status_code: null
}

export const getManagers = createAsyncThunk(
    'managers/get',
    async () => {
        try{
            const response = await axiosClient.get('managers')
            return response.data as Manager[]
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

export const createManager = createAsyncThunk(
    'managers/create',
    async (manager: CreateManagerPayload) => {
        try{
            const response = await axiosClient.post('managers', manager)
            return response.data as Manager
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

export const deleteManager = createAsyncThunk(
    'managers/delete',
    async (id: number) => {
        try{
            await axiosClient.delete(`managers/${id}`)
            return id
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

export const updateManager = createAsyncThunk(
    'managers/update',
    async (manager: Manager) => {
        try{
            const response = await axiosClient.put(`managers/${manager.id}`, manager)
            return response.data as Manager
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

const managerSlice = createSlice({
    name: 'managers',
    initialState: initialState,
    reducers: {
        setManager: (state, action) => {
            state.current_manager = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getManagers.pending, (state) => {
            state.loading = true
        })
        
        builder.addCase(getManagers.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.managers = action.payload
        })

        builder.addCase(getManagers.rejected, (state) => {
            state.loading = false
        })

        builder.addCase(createManager.pending, (state) => {
            state.loading = true
        })

        builder.addCase(createManager.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.status_code = 200
            state.managers.push(action.payload)
        })

        builder.addCase(createManager.rejected, (state) => {
            state.loading = false
        })

        builder.addCase(deleteManager.pending, (state) => {
            state.loading = true
        })

        builder.addCase(deleteManager.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.status_code = 200
            state.managers = state.managers.filter(manager => manager.id !== action.payload)
        })

        builder.addCase(deleteManager.rejected, (state) => {
            state.loading = false
        })

        builder.addCase(updateManager.pending, (state) => {
            state.loading = true
        })

        builder.addCase(updateManager.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.status_code = 200
            state.managers = state.managers.map(manager => manager.id === action.payload.id ? action.payload : manager)
        })

        builder.addCase(updateManager.rejected, (state) => {
            state.loading = false
        })
    }
})

export default managerSlice.reducer

export const { setManager } = managerSlice.actions