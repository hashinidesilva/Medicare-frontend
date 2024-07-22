import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import {Box, Button, Chip, Grid, Paper, Typography} from '@mui/material';
import Swal from 'sweetalert2';
import PatientInfoCard from '../../components/patient/PatientInfoCard';
import PrescriptionsTable
  from '../../components/prescription/PrescriptionsTable';
import api from '../../components/api/api';
import useApi from '../../hooks/useAPI';
import CustomProgress from '../../components/UI/CustomProgress';

const PrescriptionInfo = () => {
  const [prescription, setPrescription] = useState({});
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const apiRequest = useApi();
  const {prescriptionId} = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiRequest({
          method: 'GET',
          url: `/prescriptions/${prescriptionId}`,
        });
        if (response.status === 200) {
          setPrescription(response.data);
        }
      } catch (err) {
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => {
      setPrescription({});
    };
  }, [prescriptionId, navigate]);

  const {
    patient,
    medicines,
    consultationInfo,
    consultationFee,
    investigationInfo,
    investigationFee,
  } = prescription;

  const prescriptionUpdateHandler = async () => {
    const updatedPrescription = {
      processed: true,
    };
    try {
      const response = await api.put(`/prescriptions/${prescriptionId}`,
          JSON.stringify(updatedPrescription), {
            headers: {
              'Content-Type': 'application/json',
            },
          });
      await response.data;
      Swal.fire({
        icon: 'success',
        text: 'Prescription marked as Done',
        timer: 3000,
      }).then(() => {
        navigate(`/prescriptions/${prescriptionId}/pdf`);
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error updating prescription',
      });
    }
  };

  const handleClickOpen = () => {
    Swal.fire({
      title: 'Mark prescription as Done',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        prescriptionUpdateHandler();
      }
    });
  };

  const handlePdfOpen = () => {
    navigate(`/prescriptions/${prescriptionId}/pdf`);
  };

  const deletePrescriptionHandler = async (prescriptionId) => {
    try {
      const response = await apiRequest({
        method: 'DELETE',
        url: `/prescriptions/${prescriptionId}`,
      });
      Swal.fire({
        icon: 'success',
        title: 'Prescription Deleted',
        timer: 3000,
      });
      await response.data;
      navigate('/prescriptions');
    } catch (err) {
      console.error('Error Deleting prescription:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error Deleting prescription',
      });
    }
  };

  const handleDelete = (prescriptionId) => {
    Swal.fire({
      titleText: 'Are you sure you want to delete the prescription?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        deletePrescriptionHandler(prescriptionId);
      }
    });
  };

  return (
      <Paper elevation={3} sx={{padding: 2}}>
        {loading && <CustomProgress/>}
        {!loading && (
            <Grid container spacing={2} justifyContent="space-between">
              <Grid item xs={4}>
                <PatientInfoCard patient={patient}/>
              </Grid>
              {consultationInfo &&
                  <Grid item xs={4}>
                    <Box sx={{
                      border: 1,
                      borderRadius: 1,
                      padding: 1,
                      borderColor: 'grey.500',
                      minHeight: '21vh',
                    }}>
                      <Typography variant="subtitle2"
                                  color="#808080">Consultation</Typography>
                      <Typography>{consultationInfo}</Typography>
                    </Box>
                  </Grid>
              }
              {investigationInfo &&
                  <Grid item xs={4}>
                    <Box sx={{
                      border: 1,
                      borderRadius: 1,
                      padding: 1,
                      borderColor: 'grey.500',
                      minHeight: '21vh',
                    }}>
                      <Typography variant="subtitle2"
                                  color="#808080">Investigation</Typography>
                      <Typography>{investigationInfo}</Typography>
                    </Box>
                  </Grid>
              }
              <Grid item xs={1.8}>
                <Chip label={`No of Medicines: ${medicines?.length}`}
                      color="secondary" sx={{fontSize: 15}}>
                </Chip>
              </Grid>
              <Grid item xs={12}>
                <PrescriptionsTable medications={medicines}
                                    consultationFee={consultationFee}
                                    investigationFee={investigationFee}
                                    hideFooter={true}/>
              </Grid>
              <Grid item xs={12}>
                {!prescription?.processed &&
                    <Grid container spacing={2} justifyContent="flex-start">
                      <Grid item>
                        <Button variant="contained"
                                size={'small'}
                                onClick={handleClickOpen}>Processed</Button>
                      </Grid>
                      <Grid item>
                        <Button variant="contained"
                                size={'small'}
                                sx={{backgroundColor: '#b25600'}}
                                onClick={() => navigate('edit')}>Edit</Button>
                      </Grid>
                      <Grid item>
                        <Button variant="contained"
                                size={'small'}
                                color={'error'}
                                onClick={handleDelete.bind(null,
                                    prescriptionId)}>Delete</Button>
                      </Grid>
                    </Grid>
                }
                {prescription?.processed &&
                    <Grid container spacing={2} justifyContent="flex-start">
                      <Grid item>
                        <Button variant="contained"
                                size={'small'}
                                onClick={handlePdfOpen}>Show PDF</Button>
                      </Grid>
                      <Grid item>
                        <Button variant="contained"
                                size={'small'}
                                color={'error'}
                                onClick={handleDelete.bind(null,
                                    prescriptionId)}>Delete</Button>
                      </Grid>
                    </Grid>
                }
              </Grid>
            </Grid>
        )}
      </Paper>
  );
};

export default PrescriptionInfo;