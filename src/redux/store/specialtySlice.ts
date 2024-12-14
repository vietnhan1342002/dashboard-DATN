// redux/store/specialtySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Định nghĩa kiểu dữ liệu cho Specialty
interface Specialty {
    _id: string;
    departmentName: string;
    description: string;
}

// Định nghĩa state
interface SpecialtyState {
    specialties: Specialty[]; // Danh sách các chuyên khoa
    selectedSpecialty: Specialty | null; // Chuyên khoa được chọn
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
        // selectSpecialty(state, action: PayloadAction<string>) {
        //     state.selectedSpecialty = state.specialties.find(
        //         (specialty) => specialty._id === action.payload
        //     ) || null;
        // },
    },
});

// Xuất actions và reducer
export const { setSpecialties, setLoading } = specialtySlice.actions;
export default specialtySlice.reducer;
