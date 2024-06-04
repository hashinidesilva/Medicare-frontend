import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Box, ButtonBase, Grid, Paper, Typography } from "@mui/material";
import PatientInfoCard from "../components/patient/PatientInfoCard";
import axios from "axios";

const UnprocessedPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(async () => {
    const response = await axios.get("http://localhost:8080/medicare/v1/prescriptions",
      {
        params: {processed: false}
      });
    const data = await response.data;
    setPrescriptions(data.sort((p1, p2) => p1.id - p2.id));
  }, []);

  if (prescriptions.length === 0) {
    return (
      <Box sx={{display: "flex", justifyContent: "center"}}>
        <Typography variant={"h4"}>
          There are no new prescriptions!
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={5} sx={{display: "flex", justifyContent: "flex-start"}}>
      {prescriptions.map(prescription => (
        <Grid item key={prescription.id}>
          <ButtonBase
            component={Link}
            to={`${prescription.id}`}
          >
            {/*<Paper elevation={2}>*/}
              <PatientInfoCard patient={prescription.patient}/>
            {/*</Paper>*/}
          </ButtonBase>
        </Grid>
      ))}
    </Grid>
  );
};

export default UnprocessedPrescriptions;