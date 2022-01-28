import { useContext } from "react";
import { Link } from "react-router-dom";

import PrescriptionContext from "../store/prescription-context";
import { ButtonBase, Grid } from "@mui/material";
import PatientInfoCard from "../components/patient/PatientInfoCard";

const PrescriptionsPage = () => {
  const prescriptionCtx = useContext(PrescriptionContext);
  const items = prescriptionCtx.items;

  return (
    <Grid container spacing={4} sx={{margin: '20px', display: "flex"}}>
      {items.map(item => (
        <Grid item key={item.patient.id}>
          <ButtonBase
            component={Link}
            to={`${item.id}`}>
            <PatientInfoCard patient={item.patient}/>
          </ButtonBase>
        </Grid>
      ))}
    </Grid>
  );
};

export default PrescriptionsPage;