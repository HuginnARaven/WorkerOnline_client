import {createAsyncThunk} from "@reduxjs/toolkit";
import {userAPI} from "../../utils/api";
import {SetError, SetUser} from "./userSlice";
import {SetToken} from "../auth/authSlice";


export const getUser = createAsyncThunk(
    'auth/login',
    async (token,thunkAPI) => {
        try {
            const token = localStorage.getItem('access_token')
            const profileData = await userAPI.getMe((token));
           //thunkAPI.dispatch(SetUser((profileData)))

            return profileData
        } catch (err) {
            let error = err // cast the error for access

            if (!error.response) {
                throw error
            }

            if(error.response.data.code === "token_not_valid"){
                const refreshToken = localStorage.getItem('refresh_token')

                const resRefresh = await userAPI.refreshJWT({refresh: refreshToken});
                localStorage.setItem('access_token', resRefresh.access)
                const profileData = await userAPI.getMe((resRefresh.access));

                thunkAPI.dispatch(SetToken(resRefresh.access))
                thunkAPI.dispatch(SetUser(profileData))
            }

            const errorMsg = error.response.data
            thunkAPI.dispatch(SetError(errorMsg.non_field_errors[0]))
            const json = JSON.stringify(errorMsg)
            return thunkAPI.rejectWithValue(json)
        }
    }
)

export const editUser = createAsyncThunk(
    'auth/login',
    async (userData, thunkAPI) => {
        try {

            //const token = localStorage.getItem('access_token')

            const profileData = await userAPI.editMe((userData));
            console.log(profileData)
            //thunkAPI.dispatch(SetUser(profileData))

            return profileData
        } catch (err) {
            let error = err // cast the error for access

            if (!error.response) {
                throw error
            }

            const errorMsg = error.response.data
            const json = JSON.stringify(errorMsg)
            return thunkAPI.rejectWithValue(json)
        }
    }
)

export const changePassword = createAsyncThunk(
    'auth/login',
    async (passwordData, thunkAPI) => {
        try {
            const profileData = await userAPI.changePassword(passwordData);

            return profileData
        } catch (err) {
            let error = err // cast the error for access

            if (!error.response) {
                throw error
            }

            const errorMsg = error.response.data
            const json = JSON.stringify(errorMsg)
            return thunkAPI.rejectWithValue(json)
        }
    }
)