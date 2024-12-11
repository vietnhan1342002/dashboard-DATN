

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
interface User {
    _id: string; // ID từ MongoDB
    fullName: string;
    phoneNumber: string;
    roleId: {
        nameRole: string
    };
}

interface authState {
    isAuthenticated: boolean,
    isAuthenticating: boolean,
    accessToken: null | string
    user: User | null,
}


const initialState: authState = {
    isAuthenticated: false,
    isAuthenticating: true,
    accessToken: null,
    user: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload
        },
        setIsAuthenticating: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticating = action.payload
        },
        setToken: (state, action: PayloadAction<null | string>) => {
            state.accessToken = action.payload
        },
        setUser: (state, action) => {
            console.log('action.payload', action.payload);
            console.log('state.payload', state.user);
            return {
                ...state,
                user: action.payload,
            };
        },
    }
})

export const { setIsAuthenticated, setIsAuthenticating, setToken, setUser } = authSlice.actions
export default authSlice.reducer