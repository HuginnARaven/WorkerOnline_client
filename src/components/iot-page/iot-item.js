import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import {Button, FormControl, FormHelperText, InputLabel, MenuItem, Select} from "@mui/material";
import Paper from "@mui/material/Paper";
import {useState} from "react";
import {editIot} from "../../store/company/iot/iotAction";
import {useDispatch} from "react-redux";


export default function IotItem(props) {
    const supervisor = props
    const [worker, setWorker] = React.useState(props.worker);
    const [errors, setErrors] = useState({});

    let iot_data = {
        id: supervisor.id,
        worker: worker,
    }

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(iot_data)
        const res = dispatch(editIot(iot_data))
        res.then((value) => {
            console.log(value)
            if (value.error){
                let errorMsg = JSON.parse(value.payload)
                setErrors(errorMsg)
                console.log(errors)
            }else {
                setErrors({})
            }
        });
    };

    return (
        <Paper sx={{mt: 3}} key={`supervisorItem-${supervisor.id}`} elevation={3}>
            <Stack direction="row"
                   justifyContent="space-around"
                   alignItems="center"
                   spacing={2}
                   mt={2}
                   mb={2}>
                <Typography variant="subtitle1"># {supervisor.id}</Typography>
                {supervisor.worker ? (<Typography variant="subtitle1">Worker: {supervisor.username}</Typography>) : null}
                <Typography variant="subtitle1">Admin mode: {supervisor.in_admin_mode ? "Yes" : "No"}</Typography>
                <Typography variant="subtitle1">Is active: {supervisor.is_active ? "Yes" : "No"}</Typography>
                <Typography variant="subtitle1">Last active: {supervisor.localized_last_active}</Typography>

                <form id={`iot-${supervisor.id}-workerChangeForm`} onSubmit={handleSubmit}>
                <Stack direction="row">

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Worker</InputLabel>
                            <Select
                                error={errors.worker}
                                labelId="demo-simple-select-label"
                                id="workers"
                                value={worker}
                                label="Worker"
                                onChange={(e) => {setWorker(e.target.value)}}
                            >
                                {props.workers_list.map((worker) => (
                                    <MenuItem key={`worker-item-${worker.id}`} value={worker.id}>{worker.username}</MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{errors.worker}</FormHelperText>
                        </FormControl>
                        <Button type={"submit"} form={`iot-${supervisor.id}-workerChangeForm`} sx={{ml: 1}}>Appoint</Button>
                </Stack>
                </form>
            </Stack>
        </Paper>
    );
}