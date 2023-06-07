import * as React from 'react';
import {Box, Divider, Fab, FormControl, InputLabel, MenuItem, Paper, Select, Tooltip, Typography} from "@mui/material";
import {useEffect, useState} from "react";

export default function WorkerTasksStatistics(props) {
    const [selectedTask, setTask] = React.useState(props.worker_tasks_statistics.length ? props.worker_tasks_statistics[0].id : null);
    const [title, setTitle] = React.useState('');
    const [estimate_hours, setEstimateHours] = React.useState(0);
    const [times_out_of_working_place, setTimesTutOfWorkingPlace] = React.useState(0);
    const [task_performance, setTaskPerformance] = React.useState(0);
    const [is_deadline_met, setIsDeadlineMet] = React.useState(false);
    const [spent_working_hours, setSpentWorkingHours] = React.useState(0);
    const [time_start, setTimeStart] = React.useState('');
    const [time_end, setTimeEnd] = React.useState('');
    const [deadline, setDeadline] = React.useState('');

    const handleSelectTask = (taskId) => {
        setTask(taskId);
        setTitle(props.worker_tasks_statistics.find(item => item.id === taskId).title);
        setEstimateHours(props.worker_tasks_statistics.find(item => item.id === taskId).estimate_hours);
        setTimesTutOfWorkingPlace(props.worker_tasks_statistics.find(item => item.id === taskId).times_out_of_working_place);
        setTaskPerformance(props.worker_tasks_statistics.find(item => item.id === taskId).task_performance);
        setIsDeadlineMet(props.worker_tasks_statistics.find(item => item.id === taskId).is_deadline_met);
        setSpentWorkingHours(props.worker_tasks_statistics.find(item => item.id === taskId).spent_working_hours);
        setTimeStart(props.worker_tasks_statistics.find(item => item.id === taskId).time_start);
        setTimeEnd(props.worker_tasks_statistics.find(item => item.id === taskId).time_end);
        setDeadline(props.worker_tasks_statistics.find(item => item.id === taskId).deadline);
    };

    useEffect(() => {
        if (selectedTask){
            handleSelectTask(selectedTask)
        }
    }, [])

    return (
        <div>
                    {selectedTask ? (
                        <Paper sx={{p: 3}}>
                            <Typography variant="h5" mb={3} textAlign={"center"}>
                                Worker statistics per task
                            </Typography>
                                <FormControl fullWidth variant="standard" sx={{mt: 1}}>
                                    <InputLabel id="demo-simple-select-label">Task</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="task-recommended-workers"
                                        value={selectedTask}
                                        label="Task"
                                        onChange={(e) => {
                                            handleSelectTask(e.target.value)
                                        }}
                                    >
                                        {props.worker_tasks_statistics.map((task) => (
                                            <MenuItem key={`recommended-worker-item-${task.id}`}
                                                      value={task.id}>{task.title}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            <Paper elevation={3} sx={{mt: 3}}>
                                <Box p={1}>
                                    <Typography  variant="body1" textAlign={"left"}>
                                        Title: {title}
                                    </Typography>
                                    <Divider sx={{mt: 1, mb: 1}}/>
                                    <Typography  variant="body1" textAlign={"left"}>
                                        Estimate hours: {estimate_hours}
                                    </Typography>
                                    <Divider sx={{mt: 1, mb: 1}}/>
                                    <Typography  variant="body1" textAlign={"left"}>
                                        Times out of working place: {times_out_of_working_place}
                                    </Typography>
                                    <Divider sx={{mt: 1, mb: 1}}/>
                                    <Tooltip
                                        title="The greater value the faster worker handled tasks(basic 1)"
                                        followCursor>
                                        <Typography  variant="body1" textAlign={"left"}>
                                            Performance: {task_performance}
                                        </Typography>
                                    </Tooltip>
                                    <Divider sx={{mt: 1, mb: 1}}/>
                                    <Typography  variant="body1" textAlign={"left"}>
                                        Is deadline met: {is_deadline_met ? "Yes" : "No"}
                                    </Typography>
                                    <Divider sx={{mt: 1, mb: 1}}/>
                                    <Typography  variant="body1" textAlign={"left"}>
                                        Spent working hours: {spent_working_hours}
                                    </Typography>
                                    <Divider sx={{mt: 1, mb: 1}}/>
                                    <Typography variant="body1" textAlign={"left"}>
                                        Time start: {time_start}
                                    </Typography>
                                    <Divider sx={{mt: 1, mb: 1}}/>
                                    <Typography variant="body1" textAlign={"left"}>
                                        Time end: {time_end}
                                    </Typography>
                                    <Divider sx={{mt: 1, mb: 1}}/>
                                    <Typography variant="body1" textAlign={"left"}>
                                        Deadline: {deadline}
                                    </Typography>
                                </Box>
                            </Paper>
                        </Paper>
                    ) : null}
        </div>
    );
}