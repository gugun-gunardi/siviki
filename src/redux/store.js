import { configureStore } from '@reduxjs/toolkit';
import serviceReducer from './serviceSlice';
import modalReducer from './modalSlice';

const store = configureStore({
  reducer: {
    service: serviceReducer,
    modal: modalReducer,
  },
});

export default store;
