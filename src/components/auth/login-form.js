import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useDispatch, useSelector} from "react-redux";
import {Alert, CircularProgress} from "@mui/material";
import {login} from "../../store/auth/authAction";
import { useState } from 'react';
import {SetUser} from "../../store/user/userSlice";
import {getUser} from "../../store/user/userAction";

export default function LoginFormDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    let userData = {
        username: username,
        password: password,
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userData)
        const res = dispatch(login(userData));
        res.then((value) => {
            console.log(value)
            if (value.error){
                let errorMsg = JSON.parse(value.payload)
                setErrors(errorMsg)
                console.log(errors)
            }else {
                dispatch(getUser())
                handleClose();
            }
        });
    };

    const is_loading = useSelector((state) => state.auth.isLoading);

    return (
        <div>
            <Button sx={{my: 2, color: 'white', display: 'block'}} onClick={handleClickOpen}>
                Login
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Login to use website!
                    </DialogContentText>
                    <form onSubmit={handleSubmit} id="loginFrom">
                        <TextField
                            autoFocus
                            error={errors.username ? true : false}
                            helperText={errors.username}
                            margin="dense"
                            id="username"
                            label="Username"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={username} onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            error={errors.password ? true : false}
                            helperText={errors.password}
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                            variant="standard"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                        {Object.entries(errors).map((error) => (
                            error[0] !== "username" && error[0] !== "password" ? (<Alert severity="error" sx={{mt:1}}>{error[1]}</Alert>) : null
                        ))}
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" form="loginFrom">{is_loading ? <CircularProgress />: 'Login'}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}