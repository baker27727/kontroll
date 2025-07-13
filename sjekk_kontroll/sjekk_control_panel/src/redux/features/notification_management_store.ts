import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiInterface from "../../interfaces/ApiInterface";
import axiosHttp from "../../utils/axios_client";

interface NotificationActivity {
    day: string
    total_sent: number
    total_delivered: number
}

interface Notification {
    title: string
    body: string
    icon: string
    image: string
}

interface NotificationManagementState extends ApiInterface {
    total_sent: number
    total_delivered: number

    notification_activities: Array<NotificationActivity>
    notifications: Notification[]
    residential_dashboard_notifications: Notification[]
    public_notifications: Notification[]
    apartments_notifications: Notification[]
    current_apartment_dashboard_notifications: Notification[]
    current_residential_dashboard_notifications: Notification[]
    current_public_dashboard_notifications: Notification[]
}
    
const initialState: NotificationManagementState = {
    notification_activities: [],
    total_sent: 0,
    total_delivered: 0,
    loading: false,
    error: null,
    notifications: [],
    residential_dashboard_notifications: [],
    public_notifications: [],
    apartments_notifications: [],
    current_apartment_dashboard_notifications: [],
    current_residential_dashboard_notifications: [],
    current_public_dashboard_notifications: []
};

export const getNotificationsAnalytics = createAsyncThunk(
    "notification_management_store/get",
    async () => {
        try {
            const response = await axiosHttp.get(`notification-analytics`);
            console.log(response.data);
            
            return response.data
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
)

export const sendSystemNotification = createAsyncThunk(
    'notification_management_store/send',
    async (data: {
        notification_id: number,
        payload: {
            channel: string,
            destinations: string | string[]
        }
    }) => {
        try {
            const response = await axiosHttp.post(`system-notification-components/${data.notification_id}/send`, data.payload);
            console.log(response.data);
            
            return response.data
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
)

export const getAllNotifications = createAsyncThunk(
    "notification_management_store/get_all",
    async () => {
        try {
            const response = await axiosHttp.get(`notifications`);
            console.log(response.data);
            
            return response.data
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
)

export const getResidentialDashboardNotifications = createAsyncThunk(
    "notification_management_store/get_residential_dashboard",
    async () => {
        try {
            const response = await axiosHttp.get(`notifications/residential`);
            console.log(response.data);
            
            return response.data
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
)


export const getPublicPlaceDashboardNotifications = createAsyncThunk(
    "notification_management_store/get_public_place_dashboard",
    async () => {
        try {
            const response = await axiosHttp.get(`notifications/public-place`);
            console.log(response.data);
            
            return response.data
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
)

export const getApartmentsDashboardNotifications = createAsyncThunk(
    "notification_management_store/get_apartments_dashboard",
    async () => {
        try {
            const response = await axiosHttp.get(`notifications/apartment`);
            console.log(response.data);
            
            return response.data
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
)

export const getApartmentNotification = createAsyncThunk(
    "notification_management_store/get_apartment_notifications",
    async (id: number) => {
        try {
            const response = await axiosHttp.get(`apartments/${id}/notifications`);
            console.log(response.data);
            
            return response.data
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
)

export const getResidentialNotification = createAsyncThunk(
    "notification_management_store/get_residential_notifications",
    async (id: number) => {
        try {
            const response = await axiosHttp.get(`residentials/${id}/notifications`);
            console.log(response.data);
            
            return response.data
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
)

export const getPublicNotification = createAsyncThunk(
    "notification_management_store/get_public_notifications",
    async (id: number) => {
        try {
            const response = await axiosHttp.get(`public-places/${id}/notifications`);
            console.log(response.data);
            
            return response.data
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
)

const notificationManagementSlice = createSlice({
    name: "notification_management_store",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getNotificationsAnalytics.fulfilled, (state, action) => {
            state.notification_activities = action.payload.notification_activities;
            state.total_sent = action.payload.total_sent;
            state.total_delivered = action.payload.total_delivered;
        })

        builder.addCase(getNotificationsAnalytics.rejected, (state, action) => {
            state.error = action.error.message;
        })

        builder.addCase(getNotificationsAnalytics.pending, (state) => {
            state.loading = true;
        })

        builder.addCase(sendSystemNotification.fulfilled, (state) => {
            state.loading = false;
            state.error = null;
        })

        builder.addCase(sendSystemNotification.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        })

        builder.addCase(sendSystemNotification.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        builder.addCase(getAllNotifications.fulfilled, (state, action) => {
            state.notifications = action.payload;
        })

        builder.addCase(getAllNotifications.rejected, (state, action) => {
            state.error = action.error.message;
        })

        builder.addCase(getAllNotifications.pending, (state) => {
            state.loading = true;
        })

        builder.addCase(getResidentialDashboardNotifications.fulfilled, (state, action) => {
            state.residential_dashboard_notifications = action.payload;
        })

        builder.addCase(getResidentialDashboardNotifications.rejected, (state, action) => {
            state.error = action.error.message;
        })

        builder.addCase(getResidentialDashboardNotifications.pending, (state) => {
            state.loading = true;
        })

        builder.addCase(getPublicPlaceDashboardNotifications.fulfilled, (state, action) => {
            state.public_notifications = action.payload;
        })

        builder.addCase(getPublicPlaceDashboardNotifications.rejected, (state, action) => {
            state.error = action.error.message;
        })

        builder.addCase(getPublicPlaceDashboardNotifications.pending, (state) => {
            state.loading = true;
        })

        builder.addCase(getApartmentsDashboardNotifications.fulfilled, (state, action) => {
            state.apartments_notifications = action.payload;
        })

        builder.addCase(getApartmentsDashboardNotifications.rejected, (state, action) => {
            state.error = action.error.message;
        })

        builder.addCase(getApartmentsDashboardNotifications.pending, (state) => {
            state.loading = true;
        })

        builder.addCase(getApartmentNotification.fulfilled, (state, action) => {
            state.current_apartment_dashboard_notifications = action.payload;
        })

        builder.addCase(getApartmentNotification.rejected, (state, action) => {
            state.error = action.error.message;
        })

        builder.addCase(getApartmentNotification.pending, (state) => {
            state.loading = true;
        })

        builder.addCase(getResidentialNotification.fulfilled, (state, action) => {
            state.current_residential_dashboard_notifications = action.payload;
        })

        builder.addCase(getResidentialNotification.rejected, (state, action) => {
            state.error = action.error.message;
        })

        builder.addCase(getResidentialNotification.pending, (state) => {
            state.loading = true;
        })

        builder.addCase(getPublicNotification.fulfilled, (state, action) => {
            state.current_public_dashboard_notifications = action.payload;
        })

        builder.addCase(getPublicNotification.rejected, (state, action) => {
            state.error = action.error.message;
        })

        builder.addCase(getPublicNotification.pending, (state) => {
            state.loading = true;
        })
    }
});

export default notificationManagementSlice.reducer;