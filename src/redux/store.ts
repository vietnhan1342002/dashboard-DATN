// src/redux/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import doctorReducer from './store/doctorSlice';
import employeeReducer from './store/employeeSlice';
import authReducer from './store/authSlice';
import userSlice from './store/userSlice';
import specialtySlice from './store/specialtiesSlice';

import { thunk } from 'redux-thunk';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Tạo store với reducer từ doctorSlice
export const makeStore = () =>
    configureStore({
        reducer: {
            doctors: doctorReducer,
            employees: employeeReducer,
            auth: authReducer,
            user: userSlice,
            specialties: specialtySlice
        },
    });

// Tạo types để sử dụng trong ứng dụng
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

