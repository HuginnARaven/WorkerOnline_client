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
import Alert from "@mui/material/Alert";
import {deleteQualification} from "../../store/company/qualifications/qualificationsAction";

export default function QualificationDeleteForm(props) {
    const [open, setOpen] = React.useState(false);

    const [name, setName] = React.useState(null);
    const [errors, setErrors] = useState({});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setName(null);
        setErrors({});
    };

    let qualificationData = {
        id: props.id,
    }

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (props.name !== name) {
            setErrors({name: "Incorrect name!"})
        }else {
            console.log(qualificationData)
            const res = dispatch(deleteQualification(qualificationData.id))
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
                <DialogTitle>Qualification delete form</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This action will delete all workers and tasks with this qualification!
                        <p>
                            Input qualification name to continue:
                        </p>
                    </DialogContentText>
                    <form onSubmit={handleSubmit} id="qualificationUpdateForm">
                        <TextField
                            autoFocus
                            error={errors.name}
                            helperText={errors.name}
                            margin="dense"
                            id="qualification-name"
                            label="Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={name}
                            onChange={(e)=> {setName(e.target.value)}}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" form="qualificationUpdateForm" color={"error"}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}