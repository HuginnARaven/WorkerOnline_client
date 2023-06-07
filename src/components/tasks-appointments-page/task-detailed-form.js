import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";


export default function TaskDetailedForm(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <Button onClick={handleClickOpen} variant="outlined" sx={{mb:2, width: "90%"}}>Get more task info</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Task detailed info</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography variant="body1" textAlign={"left"}>
                            Title: {props.title}
                        </Typography>
                        <Divider sx={{mt: 2, mb: 2}}/>
                        <Typography variant="body1" textAlign={"left"}>
                            Description: {props.description}
                        </Typography>
                        <Divider sx={{mt: 2, mb: 2}}/>
                        <Typography variant="body1" textAlign={"left"}>
                            Estimate hours: {props.estimate_hours}
                        </Typography>
                        <Divider sx={{mt: 2, mb: 2}}/>
                        <Typography variant="body1" textAlign={"left"}>
                            Needed qualification: {props.task_difficulty_info.name}
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}