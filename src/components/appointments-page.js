import * as React from 'react';
import { DataGrid } from "@mui/x-data-grid";
import {Button, ButtonGroup} from "@mui/material";
import Box from "@mui/material/Box";

const columns = [
    {   field: 'is_done',
        headerName: 'Is done',
        flex: 1,
    },
    { field: 'time_start',
        headerName: 'Time start', type: 'dateTime',
        align: "center",
        headerAlign: 'center',
        flex: 1,
        valueGetter: ({ value }) => value && new Date(value),
    },
    {   field: 'time_end',
        headerName: 'Time end',
        type: 'dateTime',
        align: "center",
        headerAlign: 'center',
        flex: 1,
        valueGetter: ({ value }) => value && new Date(value)},
    {   field: 'task_info',
        headerName: 'Task',
        align: "center",
        headerAlign: 'center',
        flex: 1,
        valueGetter: ({ value }) => value.title},
    {   field: 'worker_info',
        headerName: 'Worker',
        align: "center",
        headerAlign: 'center',
        flex: 1,
        valueGetter: ({ value }) => value.username},
];

const rows = [
    {
        id: 131,
        is_done: false,
        time_start: "2023-05-21T16:11:40.586340Z",
        time_end: null,
        difficulty_for_worker: 1.0,
        task_appointed: 1,
        task_info: {
            id: 1,
            title: "TestTask1",
            description: "TestTask1 Description",
            estimate_hours: 10,
            difficulty: 1,
            task_difficulty_info: {
                id: 1,
                name: "Junior",
                modifier: 1
            }
        },
        worker_appointed: 3,
        worker_info: {
            id: 3,
            username: "TestWorker1",
            email: "TestWorker1@ban.ua",
            first_name: "Adam",
            last_name: "Worker",
            qualification: 3,
            worker_qualification_info: {
                id: 3,
                name: "Senior",
                modifier: 3
            },
            working_hours: 40,
            day_start: "10:00:00",
            day_end: "18:00:00",
            salary: 1000
        }
    },
    {
        id: 132,
        is_done: false,
        time_start: "2023-05-21T16:11:40.586340Z",
        time_end: null,
        difficulty_for_worker: 1.0,
        task_appointed: 1,
        task_info: {
            id: 1,
            title: "TestTask1",
            description: "TestTask1 Description",
            estimate_hours: 10,
            difficulty: 1,
            task_difficulty_info: {
                id: 1,
                name: "Junior",
                modifier: 1
            }
        },
        worker_appointed: 3,
        worker_info: {
            id: 3,
            username: "TestWorker1",
            email: "TestWorker1@ban.ua",
            first_name: "Adam",
            last_name: "Worker",
            qualification: 3,
            worker_qualification_info: {
                id: 3,
                name: "Senior",
                modifier: 3
            },
            working_hours: 40,
            day_start: "10:00:00",
            day_end: "18:00:00",
            salary: 1000
        }
    },
    {
        id: 133,
        is_done: false,
        time_start: "2023-05-21T16:11:40.586340Z",
        time_end: null,
        difficulty_for_worker: 1.0,
        task_appointed: 1,
        task_info: {
            id: 1,
            title: "TestTask1",
            description: "TestTask1 Description",
            estimate_hours: 10,
            difficulty: 1,
            task_difficulty_info: {
                id: 1,
                name: "Junior",
                modifier: 1
            }
        },
        worker_appointed: 3,
        worker_info: {
            id: 3,
            username: "TestWorker1",
            email: "TestWorker1@ban.ua",
            first_name: "Adam",
            last_name: "Worker",
            qualification: 3,
            worker_qualification_info: {
                id: 3,
                name: "Senior",
                modifier: 3
            },
            working_hours: 40,
            day_start: "10:00:00",
            day_end: "18:00:00",
            salary: 1000
        }
    }
];

export default function AppointmentsPage() {
    return (
        <div>
            {/*<Box sx={{p: 2}}>*/}
            {/*    <ButtonGroup variant="contained" aria-label="outlined primary button group">*/}
            {/*        <Button>One</Button>*/}
            {/*        <Button>Two</Button>*/}
            {/*        <Button>Three</Button>*/}
            {/*    </ButtonGroup>*/}
            {/*</Box>*/}
            <Box sx={{ height: '100%', width: '100%', p: 2}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                />
            </Box>
        </div>
    );
}