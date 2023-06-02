import {createSlice} from '@reduxjs/toolkit'
import {getTasks} from "./tasksAction";

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks_list: [],
        is_loading: false,
        errors: [],
    },
    reducers: {
        SetTasksList: (state, action) => {
            state.tasks_list = action.payload.results || []
        },
        AddTask: (state, action) => {
            state.tasks_list.push(action.payload)
        },
        EditTask: (state, action) => {
            const indexOfWorker = state.tasks_list.findIndex(object => {
                return object.id === action.payload.id;
            });
            state.tasks_list[indexOfWorker] = action.payload;
        },
        DeleteTask: (state, action) => {
            const indexOfWorker = state.tasks_list.findIndex(object => {
                return object.id === action.payload.id;
            });
            state.tasks_list.splice(indexOfWorker, 1);
        },
        SetError: (state, action) => {
            state.errors.push(action.payload)
        },
    },
    extraReducers: builder => {
        builder.addCase(getTasks.pending, (state, action) => {
            state.is_loading = true;
        });
        builder.addCase(getTasks.fulfilled, (state, action) => {
            state.is_loading = false;
        });
    }
})

export const {SetTasksList, AddTask, EditTask, DeleteTask, SetError} = tasksSlice.actions

export default tasksSlice.reducer