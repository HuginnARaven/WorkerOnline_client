import './App.css';
import NavBarHeader from "./components/header";
import * as React from "react";
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {amber} from "@mui/material/colors";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "./store/user/userAction";
import {useEffect} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import AutoAppointmentPage from "./components/auto-appointment-page";
import IndexPage from "./pages/IndexPage";
import Layout from "./components/navigation/layout";
import VotingPage from "./components/voting/voting-page";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import WorkerVotingPage from "./components/voting/worker/worker-voting-page";
import QualificationsPage from "./components/qualifications-page/qualifications-page";
import WorkersPage from "./components/workers-page/workers-page";
import TasksPage from "./components/tasks-page/tasks-page";
import TasksAppointmentsPage from "./components/tasks-appointments-page/tasks-appointments-page";
import WorkersLogsPage from "./components/workers-logs-page/workers-logs-page";
import TestComponent from "./components/test-component";
import IotPage from "./components/iot-page/iot-page";
import WorkerReportPage from "./components/workers-page/worker-report-page/worker-report-page";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: amber,
    },
});

function App() {
    const dispatch = useDispatch();
    const token = localStorage.getItem('access_token');
    useEffect(() => {
        dispatch(getUser(token))
    }, [])
    const userType = useSelector((state) => state.user.role)

    return (
        <div className="App">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <CssBaseline/>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="/" element={<IndexPage />} />
                        <Route path="qualifications" element={userType === "C" ? <QualificationsPage /> : <Navigate to="/" replace />} />
                        <Route path="workers" element={userType === "C" ? <WorkersPage /> : <Navigate to="/" replace />} />
                        <Route path="workers/report" element={userType === "C" ? <WorkerReportPage /> : <Navigate to="/" replace />} />
                        <Route path="tasks" element={userType === "C" ? <TasksPage /> : <Navigate to="/" replace />} />
                        <Route path="tasks-appointments" element={userType === "C" ? <TasksAppointmentsPage /> : <Navigate to="/" replace />} />
                        <Route path="workers-logs" element={userType === "C" ? <WorkersLogsPage /> : <Navigate to="/" replace />} />
                        <Route path="iot" element={userType === "C" ? <IotPage /> : <Navigate to="/" replace />} />
                        <Route path="auto-appointment" element={userType === "C" ? <AutoAppointmentPage /> : <Navigate to="/" replace />} />
                        <Route path="voting" element={userType === "C" ? (<VotingPage />) : (userType === "W" ? <WorkerVotingPage/> : <Navigate to="/" replace />)} />
                    </Route>
                </Routes>
            </LocalizationProvider>
        </div>
    );
}

export default App;


