import { configureStore } from '@reduxjs/toolkit'
import authSliceReducer from "./auth/authSlice";
import userSliceReducer from "./user/userSlice";
import autoAppointmentReducer from "./company/autoAppointment/autoAppointmentSlice";
import votingReducer from  "./company/voting/votingSlice";
import tasksSliceReducer from "./company/tasks/tasksSlice";
import workerVotingReducer from "./company/worker-voting/workerVotingSlice";
import qualificationsSliceReducer from "./company/qualifications/qualificationsSlice";
import workersSliceReducer from "./company/workers/workersSlice";

export default configureStore({
    reducer: {
        auth: authSliceReducer,
        user: userSliceReducer,
        autoAppointment: autoAppointmentReducer,
        voting: votingReducer,
        tasks: tasksSliceReducer,
        worker_voting: workerVotingReducer,
        qualifications: qualificationsSliceReducer,
        workers: workersSliceReducer,
    },
})