// redux/store/specialtySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Định nghĩa kiểu dữ liệu cho Department (Specialty)
interface Specialty {
    _id: string;
    departmentName: string;
    description: string;
}

// Định nghĩa state
interface SpecialtyState {
    specialties: Specialty[]; // Danh sách các khoa phòng
    selectedSpecialty: Specialty | null; // Khoa phòng được chọn
    loading: boolean; // Trạng thái loading
}

// Giá trị mặc định của state
const initialState: SpecialtyState = {
    specialties: [],
    selectedSpecialty: null,
    loading: false,
};

// Tạo slice cho specialty
const specialtySlice = createSlice({
    name: 'specialties',
    initialState,
    reducers: {
        setSpecialties(state, action: PayloadAction<Specialty[]>) {
            state.specialties = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setSelectedSpecialty(state, action: PayloadAction<Specialty | null>) {
            state.selectedSpecialty = action.payload;
        },
    },
});

// Xuất actions và reducer
export const { setSpecialties, setLoading, setSelectedSpecialty } = specialtySlice.actions;
export default specialtySlice.reducer;
