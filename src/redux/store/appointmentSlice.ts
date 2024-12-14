import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Định nghĩa kiểu dữ liệu cho Appointment
interface User {
    _id: string;
    fullName: string;
    phoneNumber: string;
}

interface Patient {
    _id: string;
    userId: User;

}

interface Doctor {
    _id: string;
    userId: User;
}

interface Appointment {
    _id: string;
    patientId: Patient;
    doctorId: Doctor;
    doctorScheduleId: string;
    appointmentDate: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    reason: string;
}

interface AppointmentState {
    appointments: Appointment[]; // Danh sách các cuộc hẹn
    selectedAppointment: Appointment | null; // Cuộc hẹn được chọn
    loading: boolean; // Trạng thái loading
}

// Giá trị mặc định của state
const initialState: AppointmentState = {
    appointments: [],
    selectedAppointment: null,
    loading: false,
};

// Tạo slice cho appointment
const appointmentSlice = createSlice({
    name: "appointments",
    initialState,
    reducers: {
        setAppointments(state, action: PayloadAction<Appointment[]>) {
            state.appointments = action.payload;
        },
        setSelectedAppointment(state, action: PayloadAction<Appointment | null>) {
            state.selectedAppointment = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        addAppointment(state, action: PayloadAction<Appointment>) {
            state.appointments.push(action.payload);
        },
        updateAppointment(state, action: PayloadAction<Appointment>) {
            const index = state.appointments.findIndex(
                (appointment) => appointment._id === action.payload._id
            );
            if (index !== -1) {
                state.appointments[index] = action.payload;
            }
        },
        deleteAppointment(state, action: PayloadAction<string>) {
            state.appointments = state.appointments.filter(
                (appointment) => appointment._id !== action.payload
            );
        },
    },
});

// Xuất actions và reducer
export const {
    setAppointments,
    setSelectedAppointment,
    setLoading,
    addAppointment,
    updateAppointment,
    deleteAppointment,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
