import {Box, Button, Grid, Paper, Stack, Typography} from '@mui/material';
import PatientInfoCard from '../patient/PatientInfoCard';
import PrescriptionsTable from './PrescriptionsTable';

const PrescriptionSummary = ({
  prescription,
  showEditOption = false,
  onConfirm,
  onEdit,
  error,
}) => {
  const {
    patient,
    diagnosis,
    history,
    medicines,
    consultationInfo,
    consultationFee,
    investigationInfo,
    investigationFee,
  } = prescription;

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
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '21vh',
            }}>
              <Grid container spacing={2.5} justifyContent={'space=between'}>
                <Grid item xs={12}>
                  <Box sx={{
                    height: '90%',
                    border: 1,
                    borderRadius: 1,
                    padding: 1,
                    borderColor: 'grey.500',
                  }}>
                    <Typography variant="subtitle2" color="#808080">History and
                      Management</Typography>
                    <Typography>{history}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{
                    height: '90%',
                    border: 1,
                    borderRadius: 1,
                    padding: 1,
                    borderColor: 'grey.500',
                  }}>
                    <Typography variant="subtitle2"
                                color="#808080">Diagnosis</Typography>
                    <Typography>{diagnosis}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          {consultationInfo &&
              <Grid item xs={12}>
                <Stack direction={'row'} spacing={3} sx={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <Typography fontWeight={550}
                              variant={'body2'}>Consultation</Typography>
                  <Box sx={{
                    width: '100%',
                    border: 1,
                    borderRadius: 1,
                    padding: 1,
                    borderColor: 'grey.500',
                  }}>
                    <Typography>{consultationInfo}</Typography>
                  </Box>
                </Stack>
              </Grid>
          }
          {investigationInfo &&
              <Grid item xs={12}>
                <Stack direction={'row'} spacing={3} sx={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <Typography fontWeight={550}
                              variant={'body2'}>Investigation</Typography>
                  <Box sx={{
                    width: '100%',
                    border: 1,
                    borderRadius: 1,
                    padding: 1,
                    borderColor: 'grey.500',
                  }}>
                    <Typography>{investigationInfo}</Typography>
                  </Box>
                </Stack>
              </Grid>
          }
          <Grid item xs={12}>
            <PrescriptionsTable medications={medicines}
                                consultationFee={consultationFee}
                                investigationFee={investigationFee}
                                hideFooter={true}/>
          </Grid>
          {showEditOption && (
              <Grid item xs={3}>
                <Stack direction={'row'} spacing={2}>
                  <Button variant="contained" sx={{backgroundColor: '#b25600'}}
                          size={'small'}
                          onClick={onEdit}>Edit</Button>
                  <Button variant="contained"
                          size={'small'}
                          onClick={handleConfirm}>Confirm</Button>
                </Stack>
              </Grid>
          )}
        </Grid>
        {error && <Typography color={'red'}>{error}</Typography>}
      </Paper>
  );
};

export default PrescriptionSummary;