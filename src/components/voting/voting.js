import * as React from 'react';
import { styled } from '@mui/material/styles';
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
import dayjs from "dayjs";
import {DateTimeField} from "@mui/x-date-pickers";
import {green, red} from "@mui/material/colors";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import VotingMenu from "./voting-menu";
import {useTranslation} from "react-i18next";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function Voting(props) {
    const { t } = useTranslation();
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

    let vote_data = props

    return (
        <Card sx={{ maxWidth: 500 }}>
            <CardHeader
                action={
                <VotingMenu {...vote_data}/>
                }
                title={vote_data.title}
            />
            <CardContent>
                <Typography variant="body2" textAlign={"left"}>
                    {t('form.description')}: {vote_data.description}
                </Typography>
                <Divider sx={{mt:2, mb: 2}}/>
                <Typography variant="body2" textAlign={"left"}>
                    {t('form.is_active')}: {vote_data.is_active ? (
                        <>{t('form.yes')}<CheckBoxIcon fontSize={"small"} sx={{ color: green[500]}}/></>) :
                        (<>{t('form.no')}<DisabledByDefaultRoundedIcon  fontSize={"small"} sx={{ color: red[500]}}/></>)
                }
                </Typography>
                <Divider sx={{mt:2, mb: 2}}/>
                <DateTimeField
                    label={t('form.deadline')}
                    value={dayjs(vote_data.deadline)}
                    format="LLL"
                    size={"small"}
                />
            </CardContent>
            <CardActions disableSpacing>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    {vote_data.voting_results.tasks_info.map((tasks_info) => (
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>{tasks_info.title}: {tasks_info.score}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {tasks_info.votes.map((vote) => (
                                    <Box sx={{mt: 3}} id={`vote-item-${vote.id}`}>
                                        <Divider/>
                                        <Typography textAlign={"left"}>
                                            {vote.worker}({vote.expertness}): {vote.score}
                                        </Typography>
                                        <Divider/>
                                    </Box>
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </CardContent>
            </Collapse>
        </Card>
    );
}