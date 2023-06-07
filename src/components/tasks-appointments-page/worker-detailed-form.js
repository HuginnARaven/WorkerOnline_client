import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {Box, Grid, Paper} from "@mui/material";


export default function WorkerDetailedForm(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <Button onClick={handleClickOpen} variant="outlined" sx={{mb:2, width: "90%"}}>Get more worker info</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Worker detailed info</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Grid justifyContent={"center"} alignContent={"center"} columnSpacing={3} container>
                            <Grid item>
                                <Typography variant="body1" textAlign={"left"}>
                                    Email: {props.email}
                                </Typography>
                                <Divider sx={{mt: 2, mb: 2}}/>
                                <Typography variant="body1" textAlign={"left"}>
                                    First name: {props.first_name}
                                </Typography>
                                <Divider sx={{mt: 2, mb: 2}}/>
                                <Typography variant="body1" textAlign={"left"}>
                                    Last name: {props.last_name}
                                </Typography>
                                <Divider sx={{mt: 2, mb: 2}}/>
                                <Typography variant="body1" textAlign={"left"}>
                                    Working hours: {props.working_hours}
                                </Typography>
                                <Divider sx={{mt: 2, mb: 2}}/>
                                <Typography variant="body1" textAlign={"left"}>
                                    Qualification: {props.worker_qualification_info.name}
                                </Typography>
                                <Divider sx={{mt: 2, mb: 2}}/>
                                <Typography variant="body1" textAlign={"left"}>
                                    Day start: {props.day_start}
                                </Typography>
                                <Divider sx={{mt: 2, mb: 2}}/>
                                <Typography variant="body1" textAlign={"left"}>
                                    Day end: {props.day_end}
                                </Typography>
                            </Grid>
                            <Grid item>
                                    <Typography textAlign={"center"}>
                                        Working days:
                                    </Typography>
                                    <Paper sx={{p:2, mt: 2}}>
                                        <Typography variant="body1" textAlign={"left"}>
                                            monday: {props.worker_schedule.monday ? "Yes" : "No"}
                                        </Typography>
                                        <Typography variant="body1" textAlign={"left"}  mt={2} mb={2}>
                                            tuesday: {props.worker_schedule.tuesday ? "Yes" : "No"}
                                        </Typography>
                                        <Typography variant="body1" textAlign={"left"}  mt={2} mb={2}>
                                            wednesday: {props.worker_schedule.wednesday ? "Yes" : "No"}
                                        </Typography>
                                        <Typography variant="body1" textAlign={"left"}  mt={2} mb={2}>
                                            thursday: {props.worker_schedule.thursday ? "Yes" : "No"}
                                        </Typography>
                                        <Typography variant="body1" textAlign={"left"}  mt={2} mb={2}>
                                            friday: {props.worker_schedule.friday ? "Yes" : "No"}
                                        </Typography>
                                        <Typography variant="body1" textAlign={"left"}  mt={2} mb={2}>
                                            saturday: {props.worker_schedule.saturday ? "Yes" : "No"}
                                        </Typography>
                                        <Typography variant="body1" textAlign={"left"}  mt={2} mb={2}>
                                            sunday: {props.worker_schedule.sunday ? "Yes" : "No"}
                                        </Typography>
                                    </Paper>
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}