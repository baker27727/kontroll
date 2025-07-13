// src/redux/users/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { baseUrl } from '../../configs/constants';
import axios from 'axios';
import RuleState from '../../interfaces/states/RuleState';
import Rule from '../../interfaces/Rule';
import UpdateRulePayload from '../../interfaces/payloads/UpdateRulePayload';
import CreateRulePayload from '../../interfaces/payloads/CreateRulePayload';

const initialState: RuleState = {
  rules: [],
  currentRule: null,
  error: null,
  loading: false,
  status_code: null,
};

export const getAllRules = createAsyncThunk('rules/getAll', async () => {
  try {
    const response = await axios.get(`${baseUrl}/rules`);
    return {
      status_code: response.status,
      rules: response.data as Rule[],
    } as RuleState;
  } catch (error) {
    console.error(error);
    throw error;
  }
});



export const updateRule = createAsyncThunk('rule/update', async (data: UpdateRulePayload) => {
  try {
    const response = await axios.put(`${baseUrl}/rules/${data.id}`, data.payload);
    return {
        status_code: response.status,
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const deleteRule = createAsyncThunk('rule/delete', async (id: number) => {
  try {
    const response = await axios.delete(`${baseUrl}/rules/${id}`);
    return {
        status_code: response.status,
        id
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const createRule = createAsyncThunk('rule/create', async (data: CreateRulePayload) => {
  try {
    const response = await axios.post(`${baseUrl}/rules`, data);
    return {
        status_code: response.status,
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});

const RuleSlice = createSlice({
  name: 'rule',
  initialState,
  reducers: {
    setCurrentRule (state,action) {
        state.currentRule = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllRules.fulfilled, (state, action: PayloadAction<RuleState>) => {
      state.rules = action.payload.rules;
      state.loading = false;
      state.error = null;
      state.status_code = action.payload.status_code;
    });

    builder.addCase(getAllRules.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllRules.rejected, (state, action) => {
      state.error = action.error.message ?? '';
      state.loading = false;
    });
    //update user logic
    builder.addCase(updateRule.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.status_code = action.payload.status_code;
    });

    builder.addCase(updateRule.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateRule.rejected, (state, action) => {
      state.error = action.error.message ?? '';
      state.loading = false;
    });

    // delete user logic
    builder.addCase(deleteRule.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.status_code = action.payload.status_code;

      state.rules = state.rules.filter((rule) => rule.id !== action.payload.id);
    });

    builder.addCase(deleteRule.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteRule.rejected, (state, action) => {
      state.error = action.error.message ?? '';
      state.loading = false;
    });

    // create user logic
    builder.addCase(createRule.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.status_code = action.payload.status_code;
    });

    builder.addCase(createRule.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(createRule.rejected, (state, action) => {
      state.error = action.error.message ?? '';
      state.loading = false;
    });
  },
});

export const {setCurrentRule} = RuleSlice.actions
export default RuleSlice.reducer;
