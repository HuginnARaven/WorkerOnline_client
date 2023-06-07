import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAppointments} from "../../store/company/tasksAppointments/tasksAppointmentsAction";
import Voting from "../voting/voting";
import TaskAppointmentItem from "./task-appointment-item";


export default function TasksAppointmentsPage() {
    const dispatch = useDispatch();
    const token = localStorage.getItem('access_token')


    useEffect(() => {
        dispatch(getAppointments(token));
    }, [])

    const appointments = useSelector((state) => state.appointments.appointments_list);
    const is_loading = useSelector((state) => state.appointments.is_loading);

    return (
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Grid
                container
                spacing={3}
                direction={'row'}
                mt={'30px'}
                justifyContent="center"
            >
            </Grid>
            <Grid
                container
                spacing={3}
                direction={'row'}
                mt={'30px'}
                justifyContent="center"
            >
                {appointments.map((appointment) => (
                    <Grid>
                        <TaskAppointmentItem {...appointment}/>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}