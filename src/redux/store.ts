// src/redux/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import doctorReducer from './store/doctorSlice';
import employeeReducer from './store/employeeSlice';
import authReducer from './store/authSlice';
import { thunk } from 'redux-thunk';

// Tạo store với reducer từ doctorSlice
export const makeStore = () =>
    configureStore({
        reducer: {
            doctors: doctorReducer,
            employees: employeeReducer,
            auth: authReducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    });

// Tạo types để sử dụng trong ứng dụng
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

