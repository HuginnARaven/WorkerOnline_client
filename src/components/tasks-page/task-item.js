import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {Alert, ButtonGroup} from "@mui/material";
import {useDispatch} from "react-redux";
import Paper from "@mui/material/Paper";
import TaskUpdateForm from "./task-update-form";
import TaskDeleteForm from "./task-delete-form";
import TaskRecommendationForm from "./task-recomendation-form";

export default function TaskItem(props) {
    const task = props
    return (
        <Paper sx={{mt: 3}} key={`taskItem-${task.id}`} elevation={3}>
            <Stack direction="row"
                   justifyContent="space-around"
                   alignItems="center"
                   spacing={2}
                   mt={2}
                   mb={2}>
                <Typography variant="subtitle1">Title: {task.title}</Typography>
                <Typography variant="subtitle1">Difficulty: {task.task_difficulty_info.name}</Typography>
                <Typography variant="subtitle1">Estimate hours: {task.estimate_hours}</Typography>
                <Typography variant="subtitle1">Is appointed: {task.is_appointed ? "Yes" : "No"}</Typography>
                <ButtonGroup variant="text" aria-label="outlined primary button group">
                    <TaskUpdateForm {...task}/>
                    {task.is_appointed ? <Button color={"success"} disabled>Appoint</Button> : <TaskRecommendationForm {...task}/>}
                    <TaskDeleteForm {...task}/>
                </ButtonGroup>
            </Stack>
        </Paper>
    );
}