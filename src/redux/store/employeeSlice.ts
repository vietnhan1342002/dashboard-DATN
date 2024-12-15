import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Định nghĩa kiểu dữ liệu cho Employee
interface Employee {
    _id: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    dob: string;
    roleId: {
        nameRole: string;
        roleName: string
    }
}

// Định nghĩa state của employees
interface EmployeeState {
    employees: Employee[];
    loading: boolean;
    error: string | null;
}

// Giá trị mặc định của state
const initialState: EmployeeState = {
    employees: [],
    loading: false,
    error: null,
};

// Tạo slice cho employee
const employeeSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        setEmployees(state, action: PayloadAction<Employee[]>) {
            state.employees = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
    },
});

// Xuất actions và reducer
export const { setEmployees, setLoading, setError } = employeeSlice.actions;
export default employeeSlice.reducer;
