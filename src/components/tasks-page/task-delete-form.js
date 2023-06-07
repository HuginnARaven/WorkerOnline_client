import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useState} from "react";
import {useDispatch} from "react-redux";
import {deleteTask} from "../../store/company/tasks/tasksAction";


export default function TaskDeleteForm(props) {
    const [open, setOpen] = React.useState(false);

    const [title, setTitle] = React.useState('');
    const [errors, setErrors] = useState({});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTitle('');
        setErrors({});
    };

    let taskData = {
        id: props.id,
    }

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (props.title !== title) {
            setErrors({title: "Incorrect title!"})
        }else {
            console.log(taskData)
            const res = dispatch(deleteTask(taskData.id))
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
        }
    };

    return (
        <div>
            <Button onClick={handleClickOpen} color={"error"}>Delete</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Task delete form</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This action will delete all statistics and logs for this task!
                        <p>
                            Input task title to continue:
                        </p>
                    </DialogContentText>
                    <form onSubmit={handleSubmit} id="taskDeleteForm">
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
                            onChange={(e)=> {setTitle(e.target.value)}}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" form="taskDeleteForm" color={"error"}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}