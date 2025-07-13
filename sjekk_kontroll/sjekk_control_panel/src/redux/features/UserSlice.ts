// src/redux/users/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { baseUrl } from '../../configs/constants';
import GetUserState from '../../interfaces/states/UserState';
import axios from 'axios';
import GetUserPayload from '../../interfaces/payloads/GetUsersPayload';
import IUser from '../../interfaces/User';
import UpdateUserPayload from '../../interfaces/payloads/UpdateUserPayload';
import CreateUserPayload from '../../interfaces/payloads/CreateUserPayload';
import axiosHttp from '../../utils/axios_client';

const initialState: GetUserState = {
  users: [],
  currentUser: null,
  error: null,
  loading: false,
  status_code: null,
  deleted_users: [],
};

export const getAllUsers = createAsyncThunk('user/fetchUsers', async () => {
  try {
    const response = await axiosHttp.get(`/users`);
    return {
      status_code: response.status,
      users: response.data as IUser[],
    } as GetUserPayload;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const getAllDeletedUsers = createAsyncThunk('user/fetchDeletedUsers', async () => {
  try {
    const response = await axiosHttp.get(`/users/deleted`);
    return {
      status_code: response.status,
      users: response.data as IUser[],
    } as GetUserPayload;
  } catch (error) {
    console.error(error);
    throw error;
  }
});



export const updateUser = createAsyncThunk('user/update', async (data: UpdateUserPayload) => {
  try {
    const response = await axios.put(`${baseUrl}/users/${data.id}`, data.payload);
    return {
        status_code: response.status,
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const deleteUser = createAsyncThunk('user/delete', async (id: number) => {
  try {
    const response = await axios.delete(`${baseUrl}/users/${id}`);
    return {
        status_code: response.status,
        user_id: id
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const createUser = createAsyncThunk('user/create', async (data: CreateUserPayload) => {
  try {
    const response = await axios.post(`${baseUrl}/users/register`, data);
    return {
        status_code: response.status,
        user: response.data
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser (state,action) {
        state.currentUser = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, action: PayloadAction<GetUserPayload>) => {
      state.users = action.payload.users;
      state.loading = false;
      state.error = null;
      state.status_code = action.payload.status_code;
    });

    builder.addCase(getAllUsers.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.error = action.error.message ?? '';
      state.loading = false;
    });
    //update user logic
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.status_code = action.payload.status_code;
    });

    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateUser.rejected, (state, action) => {
      state.error = action.error.message ?? '';
      state.loading = false;
    });

    // delete user logic
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.status_code = action.payload.status_code;
      state.users = state.users.filter(user => user.id !== action.payload.user_id)
    });

    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteUser.rejected, (state, action) => {
      state.error = action.error.message ?? '';
      state.loading = false;
    });

    // create user logic
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.status_code = action.payload.status_code;
      state.users.push(action.payload.user)
    });

    builder.addCase(createUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(createUser.rejected, (state, action) => {
      state.error = action.error.message ?? '';
      state.loading = false;
    });

    // delete user logic
    builder.addCase(getAllDeletedUsers.fulfilled, (state, action: PayloadAction<GetUserPayload>) => {
      state.deleted_users = action.payload.users;
      state.loading = false;
      state.error = null;
      state.status_code = action.payload.status_code;
    });

    builder.addCase(getAllDeletedUsers.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllDeletedUsers.rejected, (state, action) => {
      state.error = action.error.message ?? '';
      state.loading = false;
    });
  },
});

export const {setCurrentUser} = UserSlice.actions
export default UserSlice.reducer;
