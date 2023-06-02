import * as React from 'react';
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import WorkerMenu from "./worker-menu";
import WorkerScheduleEdit from "./worker-schedule-edit";

const ExpandMore = styled((props) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function WorkerItem(props) {
    const [expanded, setExpanded] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    let worker_data = props

    return (
        <Card sx={{maxWidth: 500}}>
            <CardHeader
                action={
                    <WorkerMenu {...worker_data}/>
                }
                title={`${worker_data.first_name} ${worker_data.last_name}`}
            />
            <CardContent>
                <Typography variant="body2" textAlign={"left"}>
                    Username: {worker_data.username}
                </Typography>
                <Divider sx={{mt: 2, mb: 2}}/>
                <Typography variant="body2" textAlign={"left"}>
                    Email: {worker_data.email}
                </Typography>
                <Divider sx={{mt: 2, mb: 2}}/>
                <Typography variant="body2" textAlign={"left"}>
                    First name: {worker_data.first_name}
                </Typography>
                <Divider sx={{mt: 2, mb: 2}}/>
                <Typography variant="body2" textAlign={"left"}>
                    Last name: {worker_data.last_name}
                </Typography>
                <Divider sx={{mt: 2, mb: 2}}/>
            </CardContent>
            <CardActions disableSpacing>
                <Typography variant="body2" textAlign={"left"}>
                    Detail info:
                </Typography>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon/>
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography variant="body2" textAlign={"left"}>
                        Qualification: {worker_data.worker_qualification_info.name}
                    </Typography>
                    <Divider sx={{mt: 2, mb: 2}}/>
                    <Typography variant="body2" textAlign={"left"}>
                        Working hours: {worker_data.working_hours}
                    </Typography>
                    <Divider sx={{mt: 2, mb: 2}}/>
                    <Typography variant="body2" textAlign={"left"}>
                        Day start: {worker_data.day_start}
                    </Typography>
                    <Divider sx={{mt: 2, mb: 2}}/>
                    <Typography variant="body2" textAlign={"left"}>
                        Day end: {worker_data.day_end}
                    </Typography>
                    <Divider sx={{mt: 2, mb: 2}}/>
                    <Typography variant="body2" textAlign={"left"}>
                        Salary: {worker_data.salary}
                    </Typography>
                    <Divider sx={{mt: 2, mb: 2}}/>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Work days</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <WorkerScheduleEdit {...worker_data.worker_schedule}/>
                            {Object.entries(worker_data.worker_schedule).map((day) => (
                                day[0] !== "id" && day[0] !== "worker_id" ?
                                    (<Box sx={{mt: 3}} id={`schedule-${worker_data.worker_schedule.id}-${day[0]}`}>
                                        <Divider/>
                                        <Typography textAlign={"left"}>
                                            {day[0]}: {day[1] ? "Yes" : "No"}
                                        </Typography>
                                        <Divider/>
                                    </Box>) : null
                            ))}
                        </AccordionDetails>
                    </Accordion>
                </CardContent>
            </Collapse>
        </Card>
    );
}