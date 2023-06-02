import {createAsyncThunk} from "@reduxjs/toolkit";
import {companyAPI} from "../../../utils/api";
import {SetError, SetTasksList} from "./tasksSlice";


export const getTasks = createAsyncThunk(
    'tasks/get-all',
    async (token,thunkAPI) => {
        try {
            const token = localStorage.getItem('access_token')
            const tasksData = await companyAPI.getTasks((token));
            thunkAPI.dispatch(SetTasksList((tasksData)))

            return tasksData
        } catch (err) {
            let error = err // cast the error for access

            if (!error.response) {
                throw error
            }

            const errorMsg = error.response.data
            thunkAPI.dispatch(SetError(errorMsg))
            const json = JSON.stringify(errorMsg)
            return thunkAPI.rejectWithValue(json)
        }
    }
)

