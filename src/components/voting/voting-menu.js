import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import TaskTransferField from "./task-transfer-field";
import {DateTimePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Checkbox from "@mui/material/Checkbox";
import {FormControlLabel} from "@mui/material";
import {green, red} from "@mui/material/colors";
import {useState} from "react";
import {createVoting, deleteVoting, editVoting} from "../../store/company/voting/votingAction";
import {useDispatch} from "react-redux";
import Alert from "@mui/material/Alert";

export default function VotingMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openEditForm, setOpenEditForm] = React.useState(false);
    const [openDeleteForm, setOpenDeleteForm] = React.useState(false);

    const vote_data = props

    const [title, setTitle] = React.useState(vote_data.title);
    const [description, setDescription] = React.useState(vote_data.description);
    const [tasks, setTasks] = React.useState(vote_data.voting_results.tasks_info);
    const [deadline, setDeadline] = React.useState(dayjs(vote_data.deadline));
    const [is_active, setIsActive] = React.useState(vote_data.is_active);
    const [errors, setErrors] = useState({});

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleOpenEditForm = () => {
        setAnchorEl(null);
        setOpenEditForm(true);
        setTitle(vote_data.title);
        setDescription(vote_data.description);
        setTasks(vote_data.voting_results.tasks_info);
        setDeadline(dayjs(vote_data.deadline));
        setIsActive(vote_data.is_active);
        setErrors({});
    };

    const handleCloseEditForm = () => {
        setAnchorEl(null);
        setOpenEditForm(false);
    };

    const handleOpenDeleteForm = () => {
        setAnchorEl(null);
        setOpenDeleteForm(true);
    };

    const handleCloseDeleteForm = () => {
        setAnchorEl(null);
        setOpenDeleteForm(false);
    };

    const handleEditClick = (event) => {
        setAnchorEl(event.currentTarget);
        handleOpenEditForm();
    };
    const handleDeleteClick = (event) => {
        setAnchorEl(event.currentTarget);
        handleOpenDeleteForm();
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (event) => {
        setIsActive(event.target.checked);
    };

    const handleTaskChange = tasksData => {
        setTasks(tasksData);
    };

    let voteData = {
        id: vote_data.id,
        title: title,
        description: description,
        voting_tasks: tasks.map((task, i) => task.id),
        deadline: deadline.toISOString(),
        is_active: is_active,
    }

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const res = dispatch(editVoting(voteData));
        res.then((value) => {
            console.log(value)
            if (value.error){
                let errorMsg = JSON.parse(value.payload)
                setErrors(errorMsg)
                console.log(errors)
            }else {
                handleCloseEditForm();
            }
        });
    };

    const handleSubmitDelete = (e) => {
        e.preventDefault();
        const res = dispatch(deleteVoting(voteData.id));
        res.then((value) => {
            console.log(value)
            if (value.error){
                let errorMsg = JSON.parse(value.payload)
                setErrors(errorMsg)
                console.log(errors)
            }else {
                handleCloseDeleteForm();
            }
        });
    };

    return (
        <div>
            <IconButton aria-label="settings"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}>
                <MoreVertIcon/>
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleEditClick}>Edit</MenuItem>
                <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
            </Menu>
            <Dialog open={openEditForm} onClose={handleClose}>
                <DialogTitle>Voting create form</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit} id="editVotingForm">
                        <DialogContentText>
                            Here you can edit voting
                        </DialogContentText>
                        <TextField
                            autoFocus
                            error={errors.title}
                            helperText={errors.title}
                            margin="dense"
                            id="title"
                            label="Voting title"
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
                            id="description"
                            label="Voting description"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value)
                            }}
                        />
                        <FormControlLabel sx={{mt: 3}}
                                          labelPlacement="start"
                                          control={
                            <Checkbox
                                checked={is_active}
                                onChange={handleChange}
                                inputProps={{'aria-label': 'controlled'}}
                                sx={{color: red[800], '&.Mui-checked': {color: green[600],}}}/>
                            }
                                          label="Is active: "/>
                        <TaskTransferField handleTaskChange={handleTaskChange} selected_tasks={tasks}/>
                        {errors.voting_tasks ?( <Alert sx={{mt:1}} severity="error">{errors.voting_tasks}</Alert>) : null}
                        <DateTimePicker
                            disablePast
                            sx={{mt: 3, display: "flex"}}
                                        id="deadline"
                                        defaultValue={deadline}
                                        onChange={(e) => {
                                            setDeadline(e)
                                        }}/>
                        {errors.votes ?( <Alert sx={{mt:1}} severity="error">{errors.votes}</Alert>) : null}
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditForm}>Cancel</Button>
                    <Button type="submit" form="editVotingForm">Save</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openDeleteForm}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {vote_data.title}
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmitDelete} id="deleteVotingForm">
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want delete this voting?<p/>
                        This action will delete all answers and results!
                    </DialogContentText>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteForm} sx={{color: green[600]}}>Cancel</Button>
                    <Button autoFocus sx={{color: red[800]}} type="submit" form="deleteVotingForm">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}