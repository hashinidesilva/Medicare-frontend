import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import DeleteForeverOutlinedIcon
  from '@mui/icons-material/DeleteForeverOutlined';
import {GridActionsCellItem} from '@mui/x-data-grid';
import {Box, Tooltip} from '@mui/material';
import Swal from 'sweetalert2';
import Table from '../UI/Table';
import CustomProgress from '../UI/CustomProgress';
import useApi from '../../hooks/useAPI';

const PatientsTable = (props) => {
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiRequest = useApi();
  const {searchTerm, regNo} = props;

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      try {
        const response = await apiRequest({
          method: 'GET',
          url: '/patients',
          params: {
            searchTerm: searchTerm === '' ? null : searchTerm,
            regNo: regNo === '' ? null : regNo,
          },
        });
        if (response.status === 200) {
          setPatients(response.data.sort((patient1, patient2) =>
              new Date(patient2.updatedTime) - new Date(patient1.updatedTime)));
        }
      } catch (err) {
        console.error('Error fetching Patients:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
    return () => {
      setPatients([]);
    };
  }, [searchTerm, regNo]);

  const deletePatientHandler = async () => {
    try {
      const response = await apiRequest({
        method: 'DELETE',
        url: `/patients/${selectedPatientId}`,
      });
      Swal.fire({
        icon: 'success',
        title: 'Patient Deleted',
        timer: 3000,
      });
      await response.data;
      const patientsResponse = await apiRequest({
        method: 'GET',
        url: '/patients',
      });
      const data = await patientsResponse.data;
      setPatients(data);
    } catch (err) {
      console.error('Error Deleting patient:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error Deleting patient',
      });
    }
  };

  const columns = [
    {field: 'regNo', headerName: 'Patient ID', flex: 0.5},
    {field: 'name', headerName: 'Name', flex: 1},
    {field: 'age', headerName: 'Age', flex: 0.2},
    {field: 'gender', headerName: 'Gender', flex: 0.3},
    {field: 'nic', headerName: 'NIC', flex: 0.45},
    {field: 'address', headerName: 'Address', flex: 0.75},
    {field: 'tpNumber', headerName: 'TP Number', flex: 0.5},
    {
      field: 'allergies', headerName: 'Allergies', flex: 0.5,
      renderCell: (params) => (
          <Tooltip title={params.value || ''} placement="top-start"
                   enterDelay={500} leaveDelay={200}>
            <Box
                sx={{
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  width: '100%',
                  cursor: 'default',
                }}
            >
              {params.value}
            </Box>
          </Tooltip>
      ),
    },
    {
      field: 'actions',
      type: 'actions',
      flex: 0.75,
      getActions: (params) => [
        <GridActionsCellItem
            icon={
              <Tooltip title="Add prescription">
                <MedicationOutlinedIcon color={'primary'} sx={{fontSize: 30}}/>
              </Tooltip>
            }
            label="Add prescription"
            component={Link}
            to={`${params.id}/prescriptions/create`}
            sx={{p: 0}}
        />,
        <GridActionsCellItem
            icon={
              <Tooltip title={'Edit'}>
                <EditOutlinedIcon sx={{color: '#b25600', fontSize: 30}}/>
              </Tooltip>
            }
            label="Edit"
            component={Link}
            to={`${params.id}/edit`}
            sx={{p: 0}}
        />,
        <GridActionsCellItem
            icon={
              <Tooltip title="Show history">
                <HistoryRoundedIcon sx={{color: '#8a17e2', fontSize: 30}}/>
              </Tooltip>
            }
            label="Show history"
            component={Link}
            to={`${params.id}/prescriptions`}
            sx={{p: 0}}
        />,
        <GridActionsCellItem
            icon={
              <Tooltip title="Delete">
                <DeleteForeverOutlinedIcon color="error" sx={{fontSize: 30}}/>
              </Tooltip>
            }
            label="Delete"
            onClick={handleClickOpen.bind(null, params.id)}
            sx={{p: 0}}
        />,
      ],
    },
  ];

  const handleClickOpen = (patientId) => {
    setSelectedPatientId(patientId);
    Swal.fire({
      titleText: 'Are you sure you want to delete the patient?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        deletePatientHandler();
      }
    });
  };

  return (
      <>
        {loading && <CustomProgress/>}
        {!loading && <Table columns={columns} rows={patients}/>}
      </>
  );
};

export default PatientsTable;

