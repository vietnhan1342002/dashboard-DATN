import { postDataApi } from '@/utils/fetchAPI';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';

// Định nghĩa kiểu dữ liệu cho authentication
interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
    error: string | null;
}

interface User {
    emailOrPhone: string;
    password: string;
}

// Khởi tạo state ban đầu
const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
};

// Tạo slice cho authentication
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart(state) {
            state.loading = true;
            state.error = null;
        },
        loginSuccess(state, action: PayloadAction<User>) {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.loading = false;
        },
        loginFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
        },
    },
});

// Thunk để xử lý đăng nhập
export const handleLogin = (emailOrPhone: string, password: string) => async (dispatch: AppDispatch): Promise<void> => {
    dispatch(loginStart());
    try {
        const data = await postDataApi('/user-auth/login', { emailOrPhone, password }, '');
        dispatch(loginSuccess({ emailOrPhone, password })); // Hoặc thay đổi theo thông tin từ API
        const accessToken = data.accessToken;
        const refreshToken = data.refreshToken;
        localStorage.setItem("accessToken", accessToken)
        localStorage.setItem("refreshToken", refreshToken)
    } catch (error: any) {
        dispatch(loginFailure(error.response?.data?.message || 'Login failed'));
    }
};

// Xuất actions và reducer
export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
