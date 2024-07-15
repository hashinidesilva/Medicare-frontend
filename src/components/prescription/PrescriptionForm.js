import {useEffect, useState} from 'react';

import {Grid, Paper, TextField} from '@mui/material';
import PatientInfoCardWithoutTitles
  from '../patient/PatientInfoCardWitoutTitle';
import PatientAllergiesCard from '../patient/PatientAllergiesCard';
import PrescriptionMedicineForm from './PrescriptionMedicineForm';
import PrescriptionSummary from './PrescriptionSummary';

const PrescriptionForm = ({
  onSubmit,
  patient,
  setError,
  error,
  initialPrescription,
  onCancel,
  availableMedicines = [],
}) => {
  const [medicines, setMedicines] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [diagnosis, setDiagnosis] = useState('');
  const [history, setHistory] = useState('');

  useEffect(() => {
    if (initialPrescription) {
      setMedicines(initialPrescription.medicines);
      setDiagnosis(initialPrescription.diagnosis);
      setHistory(initialPrescription.history);
    }
  }, [initialPrescription]);

  const prescriptionSubmitHandler = async (prescription) => {
    onSubmit(prescription);
  };

  const handleSummary = (medication) => {
    setMedicines(medication);
    setShowSummary(true);
    setError('');
  };

  const handleEdit = () => {
    setShowSummary(false);
    setError('');
  };

  return (
      <>
        {!showSummary && (
            <Paper elevation={3} sx={{padding: 2}}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Grid container spacing={1.5}>
                    <Grid item xs={12}>
                      <PatientInfoCardWithoutTitles
                          patient={patient}/>
                    </Grid>
                    <Grid item xs={12}>
                      <PatientAllergiesCard
                          allergies={patient?.allergies}/>
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
                          type={'text'}
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
                  <PrescriptionMedicineForm patient={patient}
                                            medicines={medicines}
                                            onShowSummary={handleSummary}
                                            allMedicines={availableMedicines}
                                            onCancel={onCancel}/>
                </Grid>
              </Grid>
            </Paper>
        )}
        {showSummary &&
            <PrescriptionSummary
                prescription={{medicines, patient, diagnosis, history}}
                showEditOption={true}
                onConfirm={prescriptionSubmitHandler}
                onEdit={handleEdit}
                error={error}/>}
      </>
  );
};

export default PrescriptionForm;