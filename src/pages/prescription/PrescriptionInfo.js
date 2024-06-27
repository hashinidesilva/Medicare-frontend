import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import {Button, Chip, Grid, Paper} from '@mui/material';
import Swal from 'sweetalert2';
import PatientInfoCard from '../../components/patient/PatientInfoCard';
import PrescriptionsTable
  from '../../components/prescription/PrescriptionsTable';
import api from '../../components/api/api';
import useApi from '../../hooks/useAPI';

const PrescriptionInfo = () => {
  const [prescription, setPrescription] = useState({});
  const params = useParams();
  const navigate = useNavigate();
  const apiRequest = useApi();
  const {prescriptionId} = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiRequest({
          method: 'GET',
          url: `/prescriptions/${prescriptionId}`,
        });
        if (response.status === 200) {
          setPrescription(response.data);
        }
      } catch (err) {
        navigate('/');
      }
    };

    fetchData();
    return () => {
      setPrescription({});
    };
  }, [prescriptionId]);

  const {patient, diagnosis, history, medicines} = prescription;

  const prescriptionUpdateHandler = async () => {
    const updatedPrescription = {
      id: prescriptionId,
      patientId: patient.id,
      diagnosis: diagnosis,
      history: history,
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

  return (
      <Paper elevation={3} sx={{padding: 2}}>
        <Grid container spacing={2} justifyContent="flex-start">
          <Grid item xs={12}>
            <Grid container spacing={5} justifyContent="space-between"
                  alignItems="flex-start">
              <Grid item xs={5}>
                <PatientInfoCard patient={patient}/>
              </Grid>
              <Grid item>
                <Chip label={`No of Items: ${medicines?.length}`}
                      color="warning" sx={{fontSize: 20}}>
                </Chip>

              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <PrescriptionsTable medications={medicines}/>
          </Grid>
          {!prescription?.processed &&
              <Grid item>
                <Button variant="contained" size="large"
                        onClick={handleClickOpen}>Processed</Button>
              </Grid>
          }
          {prescription?.processed &&
              <Grid item>
                <Button variant="contained" sx={{backgroundColor: '#0003b2'}}
                        onClick={handlePdfOpen}>Show PDF</Button>
              </Grid>
          }
        </Grid>
      </Paper>
  );
};

export default PrescriptionInfo;