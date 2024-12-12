// src/redux/store/doctorSlice.ts
import { getDataApi, patchDataApi } from '@/utils/fetchAPI';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';


interface Specialty {
    _id: string;
    name: string;
    departmentId: {
        departmentName: string;
    };
    description: {
        introduction: string
        qualifications: []
        relatedDiseases: []
    }
}

// Định nghĩa state của specialties
interface SpecialtyState {
    specialties: Specialty[];
    doctorDetail: Specialty | null
    loading: boolean;
    isError: boolean;
}


// export const fetchSpecialtyDetail = createAsyncThunk('doctor/fetchSpecialtyDetail', async (doctorId: string) => {

//     try {
//         const accessToken = localStorage.getItem('accessToken')
//         if (!accessToken) {
//             throw new Error('Specialty Not Found')
//         }
//         const res = await getDataApi(`/specialties/${doctorId}`, accessToken)

//         if (!res) {
//             throw new Error('Specialty Not Found')
//         }
//         return res
//     } catch (err) {
//         console.error(err)

//     }
// })


// export const updateSpecialty = createAsyncThunk("doctor/updateSpecialty", async ({ doctorId, data }: { doctorId: string, data: any }) => {
//     try {

//         const dataUpdate: updateSpecialtyType = {
//             yearsOfExperience: Number(data.experienceYears),
//             licenseNumber: data.license,
//             specialty: '6756a835ec215ab56e890004'
//         }
//         const accessToken = localStorage.getItem('accessToken') as string
//         const res = await patchDataApi(`/specialties/${doctorId}`, dataUpdate, accessToken)
//         console.log('res validate:', res);
//         if (!res) {
//             throw new Error('User Not Found')
//         }
//         return res
//     } catch (error) {
//         console.error(error)
//     }
// })

// Giá trị mặc định của state
const initialState: SpecialtyState = {
    specialties: [],
    doctorDetail: null,
    loading: false,
    isError: false
};

// Tạo slice cho doctor
const specialtySlice = createSlice({
    name: 'specialties',
    initialState,
    reducers: {
        setSpecialtys(state, action: PayloadAction<Specialty[]>) {
            state.specialties = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setSpecialtyDetail(state, action: PayloadAction<Specialty>) {
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

        // builder
        //     .addCase(fetchSpecialtyDetail.pending, handlePending)
        //     .addCase(fetchSpecialtyDetail.fulfilled, (state, action) => {
        //         handleFulfilled(state);
        //         state.doctorDetail = action.payload;
        //     })
        //     .addCase(fetchSpecialtyDetail.rejected, handleRejected)

        // builder
        //     .addCase(updateSpecialty.pending, (state) => {
        //         state.loading = true;
        //     })
        //     .addCase(updateSpecialty.fulfilled, (state, action) => {
        //         state.loading = false;
        //         state.doctorDetail = action.payload
        //     })
        //     .addCase(updateSpecialty.rejected, (state, action) => {
        //         state.loading = false;
        //         state.isError = true
        //     });
    },
});

// Xuất actions và reducer
export const { setSpecialtyDetail, setSpecialtys, setLoading } = specialtySlice.actions;
export default specialtySlice.reducer;
