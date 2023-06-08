import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {useState} from "react";
import {useDispatch} from "react-redux";
import Alert from "@mui/material/Alert";
import {deleteTechSupportMessage, editTechSupportMessage} from "../../store/user/techSupport/techSupportAction";

export default function WorkerMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openEditForm, setOpenEditForm] = React.useState(false);
    const [openDeleteForm, setOpenDeleteForm] = React.useState(false);

    const message_data = props
    const [delTitle, setDelTitle] = React.useState("");
    const [title, setTitle] = React.useState(message_data.title);
    const [description, setDescription] = React.useState(message_data.description);
    const [errors, setErrors] = useState({});

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleOpenEditForm = () => {
        setAnchorEl(null);
        setOpenEditForm(true);
    };

    const handleCloseEditForm = () => {
        setAnchorEl(null);
        setTitle(message_data.title);
        setDescription(message_data.description)
        setOpenEditForm(false);
    };

    const handleOpenDeleteForm = () => {
        setAnchorEl(null);
        setOpenDeleteForm(true);
    };

    const handleCloseDeleteForm = () => {
        setAnchorEl(null);
        setOpenDeleteForm(false);
        setDelTitle("")
        setErrors({});
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

    let messageData = {
        id: message_data.id,
        title: title,
        description: description,
    }

    const dispatch = useDispatch();

    const handleSubmitEdit = (e) => {
        e.preventDefault();
        console.log(messageData)
        const res = dispatch(editTechSupportMessage(messageData))
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
        if (props.title !== delTitle) {
            setErrors({delUsername: "Incorrect title!"})
        }else {
            const res = dispatch(deleteTechSupportMessage(messageData.id))
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
        }
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
                <DialogTitle>Message edit form</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Here you can edit your messages to tech-support
                    </DialogContentText>
                    <form onSubmit={handleSubmitEdit} id="messageEditForm">
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

                        {Object.entries(errors).map((error) => (
                            error[0] !== "title" && error[0] !== "description" ? (
                                <Alert severity="error" sx={{mt: 1}}>{error[1]}</Alert>) : null
                        ))}
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditForm}>Cancel</Button>
                    <Button type="submit" form="messageEditForm">Save</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openDeleteForm}
                onClose={handleClose}
                aria-labelledby="alert-message-delete-title"
                aria-describedby="alert-message-delete-description"
            >
                <DialogTitle id="alert-worker-delete-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmitDelete} id={`deleteMessageForm-${messageData.id}`}>
                        <DialogContentText id="alert-worker-delete-description">
                            Are you sure you want delete this message?
                            <p>Input title to continue:</p>
                        </DialogContentText>
                        <TextField
                            autoFocus
                            error={errors.delTitle}
                            helperText={errors.delTitle}
                            margin="dense"
                            id="message-title"
                            label="Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={delTitle}
                            onChange={(e)=> {setDelTitle(e.target.value)}}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCloseDeleteForm}>Cancel</Button>
                    <Button color={"error"} type="submit" form={`deleteMessageForm-${messageData.id}`}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}