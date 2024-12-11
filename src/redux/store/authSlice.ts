// redux/authSlice.js
import { getDataApi, postDataApi } from '@/utils/fetchAPI';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Data {
    emailOrPhone: string,
    password: string
}

interface User {
    userId: string | null;
    // fullName: string | null;
    // phone: string | null;
    // role: string | null;
}

interface AuthState {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean
}

const initialState: AuthState = {
    user: null,
    loading: false,
    isAuthenticated: false
};

import { AxiosError } from 'axios';

export const fetchlogin = createAsyncThunk(
    'auth/login',
    async (data: Data, { rejectWithValue }) => {
        try {
            const res = await postDataApi('/user-auth/login', data, '');
            const { accessToken, userId } = res;
            // Lưu accessToken vào localStorage
            localStorage.setItem('accessToken', accessToken);
            console.log(res);
            return { userId }; // Trả về userId trong một object
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response ? error.response.data : error.message);
            }
            return rejectWithValue('An unknown error occurred');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = {
                userId: null,
                // fullName: null,
                // phone: null,
                // role: null,
            };
            state.isAuthenticated = false;
            localStorage.removeItem('accessToken');
        },
    },
    extraReducers: (builder) => {

        const handlePending = (state: any) => {
            state.isLoading = true;
            state.isError = false;
        };

        const handleFulfilled = (state: any,) => {
            state.isLoading = false;
            state.isError = false;
        };

        const handleRejected = (state: any, action: any) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        };

        builder
        // .addCase(fetchlogin.pending, handlePending)
        // .addCase(fetchlogin.fulfilled, (state, action: any) => {
        //     handleFulfilled(state, action);
        //     state.user = action.payload;
        //     state.loading = false;
        //     state.isAuthenticated = true
        // })
        // .addCase(fetchlogin.rejected, handleRejected)
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
