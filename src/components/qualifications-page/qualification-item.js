import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {Alert, ButtonGroup} from "@mui/material";
import {useDispatch} from "react-redux";
import Paper from "@mui/material/Paper";
import QualificationUpdateForm from "./qualification-uppdate-form";
import QualificationDeleteForm from "./qualification-delete-form";

const qualification = {
    id: 11,
    name: "Junior",
    modifier: 1
}

export default function QualificationItem(props) {
    const qualification = props
    return (
        <Paper sx={{mt: 3}} key={`qualificationItem-${qualification.id}`} elevation={3}>
            <Stack direction="row"
                   justifyContent="space-around"
                   alignItems="center"
                   spacing={2}
                   mt={2}
                   mb={2}>
                <Typography variant="subtitle1">Name: {qualification.name}</Typography>
                <Typography variant="subtitle1">Modifier: {qualification.modifier}</Typography>

                <ButtonGroup variant="text" aria-label="outlined primary button group">
                    <QualificationUpdateForm {...props}/>
                    <QualificationDeleteForm {...props}/>
                </ButtonGroup>
            </Stack>
        </Paper>
    );
}