// src/redux/store/doctorSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Định nghĩa kiểu dữ liệu cho bác sĩ
interface Doctor {
    _id: string; // ID từ MongoDB
    avatar: string;
    userId: {
        fullName: string;
        phoneNumber: string;
        email: string;
    };
    specialtyId: {
        name: string
    };
    licenseNumber: string;
    yearsOfExperience: number;
}

// Định nghĩa state của doctors
interface DoctorState {
    doctors: Doctor[];
    loading: boolean;
}

// Giá trị mặc định của state
const initialState: DoctorState = {
    doctors: [],
    loading: false,
};

// Tạo slice cho doctor
const doctorSlice = createSlice({
    name: 'doctors',
    initialState,
    reducers: {
        setDoctors(state, action: PayloadAction<Doctor[]>) {
            state.doctors = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
    },
});

// Xuất actions và reducer
export const { setDoctors, setLoading } = doctorSlice.actions;
export default doctorSlice.reducer;
