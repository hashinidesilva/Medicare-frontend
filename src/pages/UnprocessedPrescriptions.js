import { useContext } from "react";
import { Link } from "react-router-dom";

import PrescriptionContext from "../store/prescription-context";
import { ButtonBase, Grid, Paper } from "@mui/material";
import PatientInfoCard from "../components/patient/PatientInfoCard";

const UnprocessedPrescriptions = () => {
  const prescriptionCtx = useContext(PrescriptionContext);
  const items = prescriptionCtx.items;

  return (
    <Grid container spacing={10} sx={{display: "flex", justifyContent: "center"}}>
      {items.map(item => (
        <Grid item key={item.id}>
          <ButtonBase
            component={Link}
            to={`${item.id}`}
          >
            <Paper elevation={24}>
              <PatientInfoCard patient={item.patient}/>
            </Paper>
          </ButtonBase>
        </Grid>
      ))}
    </Grid>
  );
};

export default UnprocessedPrescriptions;