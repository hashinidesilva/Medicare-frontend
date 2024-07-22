import {useEffect, useState} from 'react';

import {Grid, Paper, Stack, TextField, Typography} from '@mui/material';
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
  loading,
}) => {
  const [medicines, setMedicines] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [diagnosis, setDiagnosis] = useState('');
  const [history, setHistory] = useState('');
  const [consultationInfo, setConsultationInfo] = useState('');
  const [consultationFee, setConsultationFee] = useState(0);
  const [investigationInfo, setInvestigationInfo] = useState('');
  const [investigationFee, setInvestigationFee] = useState(0);

  useEffect(() => {
    if (initialPrescription) {
      setMedicines(initialPrescription.medicines);
      setDiagnosis(initialPrescription.diagnosis);
      setHistory(initialPrescription.history);
      setConsultationInfo(initialPrescription.consultationInfo);
      setConsultationFee(initialPrescription.consultationFee);
      setInvestigationInfo(initialPrescription.investigationInfo);
      setInvestigationFee(initialPrescription.investigationFee);
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
  const handleConsultationInfoChange = (event) => setConsultationInfo(
      event.target.value);
  const handleConsultationFeeChange = (event) => setConsultationFee(
      event.target.value);
  const handleInvestigationInfoChange = (event) => setInvestigationInfo(
      event.target.value);
  const handleInvestigationFeeChange = (event) => setInvestigationFee(
      event.target.value);

  return (
      <>
        {!showSummary && (
            <Paper elevation={3} sx={{padding: 2}}>
              <Grid container spacing={1.5}>
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
                  <Grid container spacing={1.5}>
                    <Grid item xs={12}>
                      <TextField
                          value={history}
                          fullWidth
                          id="history"
                          multiline
                          rows={2.2}
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
                          rows={2.2}
                          label="Diagnosis"
                          onChange={(event) => setDiagnosis(event.target.value)}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Stack direction={'row'} spacing={2} sx={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <Typography fontWeight={550}
                                variant={'body2'}>Consultation</Typography>
                    <TextField
                        label="Consultation Info"
                        value={consultationInfo}
                        onChange={handleConsultationInfoChange}
                        fullWidth
                    />
                    <TextField
                        label="Fee (Rs)"
                        value={consultationFee}
                        onChange={handleConsultationFeeChange}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack direction={'row'} spacing={2} sx={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <Typography fontWeight={550}
                                variant={'body2'}>Investigation</Typography>
                    <TextField
                        label="Investigation Info"
                        value={investigationInfo}
                        onChange={handleInvestigationInfoChange}
                        fullWidth
                    />
                    <TextField
                        label="Fee (Rs)"
                        value={investigationFee}
                        onChange={handleInvestigationFeeChange}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <PrescriptionMedicineForm patient={patient}
                                            medicines={medicines}
                                            onShowSummary={handleSummary}
                                            allMedicines={availableMedicines}
                                            onCancel={onCancel}
                                            enableNextButton={!!(consultationInfo ||
                                                consultationFee > 0 ||
                                                investigationInfo ||
                                                investigationFee > 0)}/>
                </Grid>
              </Grid>
            </Paper>
        )}
        {showSummary &&
            <PrescriptionSummary
                prescription={{
                  medicines,
                  patient,
                  diagnosis,
                  history,
                  consultationInfo,
                  consultationFee,
                  investigationInfo,
                  investigationFee,
                }}
                loading={loading}
                showEditOption={true}
                onConfirm={prescriptionSubmitHandler}
                onEdit={handleEdit}
                error={error}/>}
      </>
  );
};

export default PrescriptionForm;