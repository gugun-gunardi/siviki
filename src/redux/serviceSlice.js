import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fungsi untuk mendapatkan status layanan dan agent
export const fetchServiceStatus = createAsyncThunk(
  'service/fetchServiceStatus',
  async () => {
    return {
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
    queuePosition: 0,
    ticketId: null,
    userId: null,
    loading: false,
    error: null,
  },
  reducers: {
    setServiceStatus: (state, action) => {
      state.isServiceActive =
        action.payload.isServiceActive ?? state.isServiceActive;
      state.agentBusy = action.payload.agentBusy ?? state.agentBusy;
    },
    setQueueInfo: (state, action) => {
      state.queuePosition = action.payload.queuePosition;
      state.ticketId = action.payload.ticketId;
      state.userId = action.payload.userId;
    },
    resetService: (state) => {
      state.agentBusy = false;
      state.queuePosition = 0;
      state.ticketId = null;
      state.userId = null;
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

export const { setServiceStatus, setQueueInfo, resetService } =
  serviceSlice.actions;
export default serviceSlice.reducer;
