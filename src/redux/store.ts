
// src/redux/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import doctorReducer from './store/doctorSlice';
import employeeReducer from './store/employeeSlice';
import specialtyReducer from './store/specialtySlice';
import serviceReducer from './store/serviceSlice';
import appointmentReducer from './store/appointmentSlice';

// Tạo store với reducer từ doctorSlice
export const makeStore = () =>
    configureStore({
        reducer: {
            doctors: doctorReducer,
            employees: employeeReducer,
            specialties: specialtyReducer,
            services: serviceReducer,
            appointments: appointmentReducer,

        },
    });

// Tạo types để sử dụng trong ứng dụng
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

