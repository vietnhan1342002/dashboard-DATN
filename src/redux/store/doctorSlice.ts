// src/redux/store/doctorSlice.ts
import { getDataApi, patchDataApi } from '@/utils/fetchAPI';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateDoctorType } from './typeUpdateDoctor.type';


interface Doctor {
    _id: string;
    userId: {
        _id: string,
        fullName: string;
        phoneNumber: string;
    };
    specialtyId: {
        _id: string
        name: string
    };
    licenseNumber: string;
    yearsOfExperience: number;
}

// Định nghĩa state của doctors
interface DoctorState {
    doctors: Doctor[];
    doctorDetail: Doctor | null
    loading: boolean;
    isError: boolean;
}


export const fetchDoctorDetail = createAsyncThunk('doctor/fetchDoctorDetail', async (doctorId: string) => {

    try {
        const accessToken = localStorage.getItem('accessToken')
        if (!accessToken) {
            throw new Error('Doctor Not Found')
        }
        const res = await getDataApi(`/doctors/${doctorId}`, accessToken)

        if (!res) {
            throw new Error('Doctor Not Found')
        }
        return res
    } catch (err) {
        console.error(err)

    }
})


export const updateDoctor = createAsyncThunk("doctor/updateDoctor", async ({ doctorId, data }: { doctorId: string, data: any }) => {
    try {

        const dataUpdate: updateDoctorType = {
            yearsOfExperience: Number(data.experienceYears),
            licenseNumber: data.license,
            specialty: '6756a835ec215ab56e890004'
        }
        const accessToken = localStorage.getItem('accessToken') as string
        const res = await patchDataApi(`/doctors/${doctorId}`, dataUpdate, accessToken)
        console.log('res validate:', res);
        if (!res) {
            throw new Error('User Not Found')
        }
        return res
    } catch (error) {
        console.error(error)
    }
})

// Giá trị mặc định của state
const initialState: DoctorState = {
    doctors: [],
    doctorDetail: null,
    loading: false,
    isError: false
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
        setDoctorDetail(state, action: PayloadAction<Doctor>) {
            state.doctorDetail = action.payload;
        },
    },

    extraReducers: (builder) => {
        const handlePending = (state: any) => {
            state.isLoading = true;
            state.isError = false;
        };

        const handleFulfilled = (state: any) => {
            state.isLoading = false;
            state.isError = false;
        };

        const handleRejected = (state: any, action: any) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        };

        builder
            .addCase(fetchDoctorDetail.pending, handlePending)
            .addCase(fetchDoctorDetail.fulfilled, (state, action) => {
                handleFulfilled(state);
                state.doctorDetail = action.payload;
            })
            .addCase(fetchDoctorDetail.rejected, handleRejected)

        // builder
        //     .addCase(updateDoctor.pending, (state) => {
        //         state.loading = true;
        //     })
        //     .addCase(updateDoctor.fulfilled, (state, action) => {
        //         state.loading = false;
        //         state.doctorDetail = action.payload
        //     })
        //     .addCase(updateDoctor.rejected, (state, action) => {
        //         state.loading = false;
        //         state.isError = true
        //     });
    },
});

// Xuất actions và reducer
export const { setDoctorDetail, setDoctors, setLoading } = doctorSlice.actions;
export default doctorSlice.reducer;
