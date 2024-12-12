// src/redux/store/doctorSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Định nghĩa kiểu dữ liệu cho bác sĩ
interface User {
    _id: string; // ID từ MongoDB
    fullName: string;
    phoneNumber: string;
    roleId: {
        nameRole: string
    };

}

// Định nghĩa state của doctors
interface UserState {
    user: User
    loading: boolean;
}

// Giá trị mặc định của state
const initialState: UserState = {
    user: {
        _id: '',
        fullName: '',
        phoneNumber: '',
        roleId: {
            nameRole: ''
        }
    },
    loading: false,
};

// Tạo slice cho doctor
const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
    },
});

// Xuất actions và reducer
export const { setUser, setLoading } = userSlice.actions;
export default userSlice.reducer;
