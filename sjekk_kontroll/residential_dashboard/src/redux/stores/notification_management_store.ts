import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import ApiInterface from "../../interfaces/ApiInterface"
import axiosClient from "../../utils/axios_client"

interface Notification {
    id: number
    title: string
    body: string
    icon: string
    image: string
}

interface NotificationManagementState extends ApiInterface{
    notifications: Notification[];
    loading: boolean;
    error: string | null;
    status_code: number | null;
}

const initialState: NotificationManagementState = {
    notifications: [],
    loading: false,
    error: null,
    status_code: null
}

export const getResidentialNotification = createAsyncThunk(
    "notification_management_store/get_residential_notifications",
    async (id: number) => {
        try {
            const response = await axiosClient.get(`residentials/${id}/notifications`);
            console.log(response.data);
            
            return response.data
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
)


const notificationManagementSlice = createSlice({
    name: 'notification_management',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getResidentialNotification.fulfilled, (state, action) => {
            state.notifications = action.payload;
        })

        builder.addCase(getResidentialNotification.rejected, (state, action) => {
            state.error = action.error.message;
        })

        builder.addCase(getResidentialNotification.pending, (state) => {
            state.loading = true;
        })
    }
})

export default notificationManagementSlice.reducer