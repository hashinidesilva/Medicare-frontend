import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import axios from 'axios';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {GridActionsCellItem} from '@mui/x-data-grid';
import {Tooltip} from '@mui/material';
import Table from '../UI/Table';
import CustomProgress from '../UI/CustomProgress';

const MedicineTable = (props) => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const {searchText, showLowInventory} = props;

  useEffect(() => {
    const fetchMedicines = async () => {
      setLoading(true);
      try {
        const response = await axios({
          method: 'GET',
          url: '/medicines',
          params: {
            medicineName: searchText === '' ? null : searchText,
            lowInventory: showLowInventory ?? null,
          },
        });
        if (response.status === 200) {
          setMedicines(response.data.sort((med1, med2) => med2.id - med1.id));
        }
      } catch (err) {
        console.error('Error fetching Medicines:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
    return () => {
      setMedicines([]);
    };
  }, [searchText, showLowInventory]);

  const columns = [
    {field: 'id', headerName: 'ID', flex: 0.5},
    {field: 'name', headerName: 'Medicine name', flex: 3},
    {field: 'type', headerName: 'Type', flex: 0.75},
    {field: 'unitPrice', headerName: 'Unit Price (Rs)', flex: 1},
    {field: 'units', headerName: 'Units', flex: 1},
    {field: 'minimumUnits', headerName: 'Minimum Units', flex: 1},
    {
      field: 'actions',
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem
            icon={
              <Tooltip title={'Edit'}>
                <EditOutlinedIcon fontSize="medium" sx={{color: '#b25600'}}/>
              </Tooltip>
            }
            component={Link}
            to={`/medicines/${params.id}/edit`}
            label="Edit"
        />,
      ],
    },
  ];

  return (
      <>
        {loading && <CustomProgress/>}
        {!loading && <Table columns={columns} rows={medicines}/>}
      </>
  );
};

export default MedicineTable;