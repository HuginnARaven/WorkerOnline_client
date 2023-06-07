import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useDispatch, useSelector} from "react-redux";
import {CircularProgress} from "@mui/material";
import {login, register} from "../../store/auth/authAction";
import { useState } from 'react';

export default function RegisterFormDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    let userData = {
        username: username,
        email: email,
        password: password,
        password2: password2,
        name: name,
        description: description,
    }

    let authData = {
        username: username,
        password: password,
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userData)
        const res = dispatch(register(userData));
        res.then((value) => {
            if (value.error){
                let errorMsg = JSON.parse(value.payload)
                setErrors(errorMsg)
                console.log(errors)
            }else {
                dispatch(login(authData))
                handleClose();
            }
        });
    };

    const is_loading = useSelector((state) => state.auth.isLoading);

    return (
        <div>
            <Button sx={{my: 2, color: 'white', display: 'block'}} onClick={handleClickOpen}>
                Signup
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Signup form</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Register to use website!
                    </DialogContentText>
                    <form onSubmit={handleSubmit} id="loginFrom">
                        <TextField
                            autoFocus
                            margin="dense"
                            id="username"
                            label="Username"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={username} onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Email"
                            type="email"
                            fullWidth
                            variant="standard"
                            value={email} onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                            variant="standard"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="password2"
                            label="Repeat password"
                            type="password"
                            fullWidth
                            variant="standard"
                            value={password2} onChange={(e) => setPassword2(e.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Company name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={name} onChange={(e) => setName(e.target.value)}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose} type="submit" form="loginFrom">{is_loading ? <CircularProgress />: 'Signup'}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}