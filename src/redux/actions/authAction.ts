import { createAsyncThunk } from '@reduxjs/toolkit'

// Import Reducers
import { setIsAuthenticated, setIsAuthenticating, setToken, setUser } from '../store/authSlice'
import { getDataApi, postDataApi } from '@/utils/fetchAPI'

// Login Action
export const login = createAsyncThunk('auth/login', async (user: any, { dispatch }) => {
    // Set Is Authenticating `true`
    dispatch(setIsAuthenticating(true))
    try {
        const res = await postDataApi('/user-auth/login', user, '');
        console.log('res', res);

        // If Error or Token Doesn't Exist
        if (!res) {
            throw new Error('Token Not Found')
        }

        const accessToken = res.accessToken
        const userId = res.userId;
        // Validate User By Token
        dispatch(validateUser({ userId, accessToken }))

    } catch (err) {
        // Dispatch `authReducer` Values to Redux Store
        dispatch(setIsAuthenticated(false))
        dispatch(setToken(null))
        dispatch(setUser(null))

        // Set Is Authenticating `false`
        dispatch(setIsAuthenticating(false))
    }
})

// Validate User By Token
export const validateUser = createAsyncThunk('auth/validateUser', async ({ accessToken, userId }: { accessToken: string, userId: string }, { dispatch }) => {

    // Set Is Authenticating `true`
    dispatch(setIsAuthenticating(true))
    try {
        // If Token Doesn't Exist
        if (!accessToken) {
            throw new Error('User Not Found')
        }

        const res = await getDataApi(`/user-auth/${userId}`, accessToken)
        console.log('res validate:', res);

        // If Error or User Doesn't Exist
        if (!res) {
            throw new Error('User Not Found')
        }

        // Save `token` & `user` to localStorage
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('userId', res._id)

        // Dispatch `authReducer` Values to Redux Store
        dispatch(setIsAuthenticated(true))
        console.log('Dispatching setToken:', accessToken);
        dispatch(setToken(accessToken));
        console.log('Dispatching setUser:', res);
        dispatch(setUser(res));
    } catch (err) {
        console.error(err)
        dispatch(setIsAuthenticated(false))
        dispatch(setToken(null))
        dispatch(setUser(null))
    } finally {
        dispatch(setIsAuthenticating(false));
    }
})

// Logout Action
export const logout = createAsyncThunk('auth/logout', async (e, { dispatch }) => {

    // Set Is Authenticating `true`
    dispatch(setIsAuthenticating(true))

    // Clear localStorage
    localStorage.clear()

    // Dispatch `authReducer` Values to Redux Store
    dispatch(setIsAuthenticated(false))
    dispatch(setToken(null))
    dispatch(setUser(null))

    // Set Is Authenticating `false`
    dispatch(setIsAuthenticating(false))
})