import React from "react";

import {Box, Button, Grid, Paper, Stack, Typography} from "@mui/material";
import PatientInfoCard from "../patient/PatientInfoCard";
import PrescriptionsTable from "./PrescriptionsTable";

const PrescriptionSummary = ({prescription, showEditOption = false, onConfirm, onEdit, error}) => {
    const {patient, diagnosis, history, medicines} = prescription;

    const handleConfirm = () => {
        onConfirm(prescription);
    };

    return (
        <Paper elevation={3} sx={{padding: 2}}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <PatientInfoCard patient={patient}/>
                </Grid>
                <Grid item xs={8}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Box sx={{width: "97%", border: 1, borderRadius: 1, padding: 1, borderColor: "grey.500"}}>
                                <Typography variant="subtitle2" color="#808080">History and Management</Typography>
                                <Typography>{history}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{width: "97%", border: 1, borderRadius: 1, padding: 1, borderColor: "grey.500"}}>
                                <Typography variant="subtitle2" color="#808080">Diagnosis</Typography>
                                <Typography paragraph={true}>{diagnosis}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <PrescriptionsTable medications={medicines}/>
                </Grid>
                {showEditOption && (
                    <Grid item xs={3}>
                        <Stack direction={"row"} spacing={2}>
                            <Button variant="contained" sx={{backgroundColor: "#b25600"}}
                                    onClick={onEdit}>Edit</Button>
                            <Button variant="contained" sx={{backgroundColor: "#0003b2"}}
                                    onClick={handleConfirm}>Confirm</Button>
                        </Stack>
                    </Grid>
                )}
            </Grid>
            {error && <Typography color={"red"}>{error}</Typography>}
        </Paper>
    );
};

export default PrescriptionSummary;