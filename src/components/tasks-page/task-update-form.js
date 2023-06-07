import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Fab, FormControl, InputLabel, MenuItem, Select, Tooltip} from "@mui/material";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Alert from "@mui/material/Alert";
import {editTask} from "../../store/company/tasks/tasksAction";

export default function TaskUpdateForm(props) {
    const [open, setOpen] = React.useState(false);

    const [title, setTitle] = React.useState(props.title);
    const [description, setDescription] = React.useState(props.description);
    const [estimate_hours, setEstimateHours] = React.useState(props.estimate_hours);
    const [difficulty, setDifficulty] = React.useState(props.difficulty);
    const [errors, setErrors] = useState({});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setErrors({});
    };

    let taskData = {
        id: props.id,
        title: title,
        description: description,
        estimate_hours: estimate_hours,
        difficulty: difficulty,
    }

    const difficulties_list = useSelector((state) => state.qualifications.qualifications_list);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(taskData)
        const res = dispatch(editTask(taskData))
        res.then((value) => {
            console.log(value)
            if (value.error){
                let errorMsg = JSON.parse(value.payload)
                setErrors(errorMsg)
                console.log(errors)
            }else {
                handleClose();
            }
        });
    };

    return (
        <div>
            <Button onClick={handleClickOpen}>Edit</Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Task update form</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Here you can change new task info
                    </DialogContentText>
                    <form onSubmit={handleSubmit} id="qualificationCreateForm">
                        <TextField
                            autoFocus
                            error={errors.title}
                            helperText={errors.title}
                            margin="dense"
                            id="task-title"
                            label="Title"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value)
                            }}
                        />

                        <TextField
                            error={errors.description}
                            helperText={errors.description}
                            margin="dense"
                            id="task-description"
                            label="Description"
                            type="text"
                            fullWidth
                            variant="standard"
                            multiline
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value)
                            }}
                        />

                        <TextField
                            error={errors.estimate_hours}
                            helperText={errors.estimate_hours}
                            margin="dense"
                            id="task-estimate_hours"
                            label="Estimate hours"
                            type="number"
                            fullWidth
                            variant="standard"
                            value={estimate_hours}
                            onChange={(e) => {
                                setEstimateHours(e.target.value)
                            }}
                        />

                        <FormControl fullWidth  variant="standard">
                            <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="task-difficulties"
                                value={difficulty}
                                label="Difficulty"
                                onChange={(e) => {setDifficulty(e.target.value)}}
                            >
                                {difficulties_list.map((difficulty_item) => (
                                    <MenuItem key={`difficulty-item-${difficulty_item.id}`} value={difficulty_item.id}>{difficulty_item.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {Object.entries(errors).map((error) => (
                            error[0] !== "name" && error[0] !== "modifier" ? (
                                <Alert severity="error" sx={{mt: 1}}>{error[1]}</Alert>) : null
                        ))}
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" form="qualificationCreateForm">Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}