import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fungsi untuk mendapatkan status layanan dan agent
export const fetchServiceStatus = createAsyncThunk(
  'service/fetchServiceStatus',
  async () => {
    // const serviceResponse = await axios.get('/api/service/status');
    // const agentResponse = await axios.get('/api/agent/status');
    return {
      //   serviceActive: serviceResponse.data.isActive,
      //   agentBusy: agentResponse.data.isBusy,
      serviceActive: true,
      agentBusy: true,
    };
  }
);

const serviceSlice = createSlice({
  name: 'service',
  initialState: {
    isServiceActive: true, // Default status layanan
    agentBusy: false, // Default status agent
    loading: false,
    error: null,
  },
  reducers: {
    setServiceStatus: (state, action) => {
      state.isServiceActive =
        action.payload.isServiceActive ?? state.isServiceActive;
      state.agentBusy = action.payload.agentBusy ?? state.agentBusy;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServiceStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.isServiceActive = action.payload.serviceActive;
        state.agentBusy = action.payload.agentBusy;
      })
      .addCase(fetchServiceStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setServiceStatus } = serviceSlice.actions;
export default serviceSlice.reducer;
