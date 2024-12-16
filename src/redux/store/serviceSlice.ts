import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Định nghĩa kiểu dữ liệu cho Service
interface ServiceDescription {
    introduction: string;
    qualifications: string[];
    relatedDiseases: string[];
    _id: string;
}

interface Service {
    _id: string;
    name: string;
    icon: string;
    departmentId: {
        _id: string;
        departmentName: string;
    };
    description: ServiceDescription;
}

// Định nghĩa state cho Service
interface ServiceState {
    services: Service[]; // Danh sách dịch vụ
    selectedService: Service | null; // Dịch vụ được chọn
    loading: boolean; // Trạng thái loading
}

// Giá trị mặc định của state
const initialState: ServiceState = {
    services: [],
    selectedService: null,
    loading: false,
};

// Tạo slice cho service
const serviceSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {
        setServices(state, action: PayloadAction<Service[]>) {
            state.services = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },

    },
});

// Xuất actions và reducer
export const { setServices, setLoading } = serviceSlice.actions;
export default serviceSlice.reducer;
