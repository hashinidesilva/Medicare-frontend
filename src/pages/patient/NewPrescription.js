import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import { Card, CardContent, Grid, Paper, TextField, Typography } from "@mui/material";
import PrescriptionForm from "../../components/prescription/PrescriptionForm";
import PatientAllergiesCard from "../../components/patient/PatientAllergiesCard";
import PrescriptionSummary from "../../components/prescription/PrescriptionSummary";

const NewPrescription = () => {
  const [patient, setPatient] = useState({});
  const [diagnosis, setDiagnosis] = useState("");
  const [history, setHistory] = useState("");
  const [error, setError] = useState("");
  const [showSummary, setShowSummary] = useState("");
  const [prescription, setPrescription] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  const {patientId} = params;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:8080/medicare/v1/patients/${patientId}`);
        const data = response.data;
        setPatient(data);
      } catch (err) {
        navigate("/");
      }
    }

    fetchData();
  }, [patientId]);

  const prescriptionSubmitHandler = async (prescription) => {
    const formattedPrescription = {
      patientId: prescription.patientId,
      diagnosis: diagnosis,
      history: history,
      medicines: prescription.medicines.map(medicine => {
        return {
          additionalInfo: medicine.additionalInfo,
          dose: medicine.additionalInfo,
          duration: medicine.duration,
          frequency: medicine.frequency,
          frequencyText: medicine.frequencyText,
          quantity: medicine.quantity,
          medicineId: medicine.medicine.id
        };
      })
    };
    try {
      const response = await fetch("http://localhost:8080/medicare/v1/prescriptions", {
        method: 'POST',
        body: JSON.stringify(formattedPrescription),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`HTTP status ${response.status}: ${errorData}`);
      }
      navigate("/patients");
    } catch (error) {
      setError('Failed to submit prescription: ' + error.message);
    }
  };

  const handleSummary = (medication) => {
    setPrescription({...medication, diagnosis: diagnosis, history: history});
    setShowSummary(true);
  };

  const handleEdit = () => {
    setShowSummary(false);
    setError("");
  };

  return (
    <>
      {!showSummary && (
        <Paper elevation={3} sx={{padding: 2}}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Grid container spacing={3.5}>
                <Grid item xs={12}>
                  <Card variant="outlined" sx={{backgroundColor: "#bfdef8"}}>
                    <CardContent>
                      <Typography>{patient.name}</Typography>
                      <Typography>{`${patient.age} years`}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <PatientAllergiesCard allergies={patient.allergies}/>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={9}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    value={history}
                    fullWidth
                    id="history"
                    multiline
                    rows={3}
                    label="History and Management"
                    type={"text"}
                    onChange={(event) => setHistory(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={diagnosis}
                    fullWidth
                    id="diagnosis"
                    multiline
                    rows={3}
                    label="Diagnosis"
                    onChange={(event) => setDiagnosis(event.target.value)}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <PrescriptionForm patient={patient} onSubmit={prescriptionSubmitHandler}
                                medicines={prescription?.medicines} onShowSummary={handleSummary}/>
            </Grid>
          </Grid>
        </Paper>
      )}
      {showSummary &&
        <PrescriptionSummary
          prescription={{...prescription, patient}}
          showEditOption={true}
          onConfirm={prescriptionSubmitHandler}
          onEdit={handleEdit}
          error={error}/>}
    </>
  );
};

export default NewPrescription;