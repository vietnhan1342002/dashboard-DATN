import { getDataApi } from "@/utils/fetchAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setUser } from "../store/authSlice";

export const getUser = createAsyncThunk('/user-auth', async ({ accessToken, userId }: { accessToken: string, userId: string }, { dispatch }) => {

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
        dispatch(setUser(res))
    } catch (err) {
        console.error(err)

    }
})