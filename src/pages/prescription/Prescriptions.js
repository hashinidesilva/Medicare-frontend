import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { format } from "date-fns";
import dayjs from "dayjs";
import {
  Button,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField,
  Typography
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import Table from "../../components/UI/Table";

const dateRanges = [
  {
    label: 'Today',
    range: [dayjs().startOf('day'), dayjs().endOf('day')]
  },
  {
    label: 'Yesterday',
    range: [dayjs().subtract(1, 'day').startOf('day'), dayjs().subtract(1, 'day').endOf('day')]
  },
  {
    label: 'Last 7 Days',
    range: [dayjs().subtract(6, 'day').startOf('day'), dayjs().endOf('day')]
  },
  {
    label: 'Last 30 Days',
    range: [dayjs().subtract(29, 'day').startOf('day'), dayjs().endOf('day')]
  },
  {
    label: 'This Month',
    range: [dayjs().startOf('month'), dayjs().endOf('month')]
  },
  {
    label: 'Last Month',
    range: [dayjs().subtract(1, 'month').startOf('month'), dayjs().subtract(1, 'month').endOf('month')]
  }
];

const columns = [
  {field: 'prescriptionId', headerName: 'Prescription ID', flex: 1},
  {field: 'patientName', headerName: 'Patient Name', flex: 2},
  {field: 'date', headerName: 'Date Prescribed', flex: 1},
  {field: 'status', headerName: 'Status', flex: 1},
  {
    field: 'actions',
    type: 'actions',
    flex: 1,
    renderCell: (params) => (
      <strong>
        <Button
          component={Link}
          to={`${params.id}`}
        >
          View All Drugs
        </Button>
      </strong>
    ),
  }
];

const mappedPrescriptions = (prescription) => {
  return {
    id: prescription.id,
    prescriptionId: prescription.id,
    patientName: prescription.patient.name,
    date: format(new Date(prescription.createdTime), 'yyyy-MM-dd'),
    status: prescription.processed ? "Done" : "Pending"
  };
};
const Prescriptions = () => {
  const [searchText, setSearchText] = useState("");
  const [prescriptions, setPrescriptions] = useState([]);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState(dateRanges[0]);

  useEffect(() => {
    setLoading(true);
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get("http://localhost:8080/medicare/v1/prescriptions",
          {
            params: {processed: checked}
          });
        setPrescriptions(response.data.sort((p1, p2) => p1.id - p2.id).map(pres => mappedPrescriptions(pres)));

      } catch (err) {
        console.log("ERROR MM", err);
      }
      setLoading(false);
    };

    fetchPrescriptions();

    return () => {
      setPrescriptions([]);
    };

  }, [checked]);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const handleDateRangeSelect = (event) => {
    const selectedRange = event.target.value;
    const range = dateRanges.find((range) => range.label === selectedRange);
    setSelectedDateRange(range);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <>
      <Typography variant="h4" sx={{mb: 4}}>
        {`${checked ? "Processed Prescriptions" : "New Prescriptions"}`}
      < /Typography>
      <Grid container justifyContent="space-between" alignItems={"center"} sx={{mb: 3}} direction={"row"} spacing={2}>
        <Grid item>
          <TextField
            label="Search"
            variant="outlined"
            value={searchText}
            onChange={handleSearch}
            InputProps={{
              startAdornment: <Search/>,
            }}
          />
        </Grid>
        <Grid item>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <Select
                value={selectedDateRange ? selectedDateRange.label : ''}
                onChange={handleDateRangeSelect}
              >
                {dateRanges.map((range, index) => (
                  <MenuItem key={index} value={range.label}>
                    {range.label}
                  </MenuItem>
                ))}
              </Select>
              <DatePicker
                label="Start Date"
                value={selectedDateRange ? selectedDateRange.range[0] : null}
                onChange={(date) => setSelectedDateRange({
                  ...selectedDateRange,
                  range: [date, selectedDateRange ? selectedDateRange.range[1] : null]
                })}
              />
              <DatePicker
                label="End Date"
                value={selectedDateRange ? selectedDateRange.range[1] : null}
                onChange={(date) => setSelectedDateRange({
                  ...selectedDateRange,
                  range: [selectedDateRange ? selectedDateRange.range[0] : null, date]
                })}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item>
          <FormControlLabel
            control={<Switch checked={checked} onChange={handleChange}/>}
            label={'Processed'}
          />
        </Grid>
      </Grid>
      <Paper elevation={1} sx={{padding: 2}}>
        {loading && <Typography>Loading ...</Typography>}
        {!loading && <Table columns={columns} rows={prescriptions}/>}
      </Paper>
    </>
  );
};

export default Prescriptions;