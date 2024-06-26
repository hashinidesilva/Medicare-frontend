import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { format } from "date-fns";
import dayjs from "dayjs";
import {
  Button, CircularProgress,
  FormControlLabel,
  Grid, IconButton, InputAdornment,
  MenuItem,
  Paper,
  Select, Stack,
  Switch,
  TextField, Tooltip,
  Typography
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import SearchIcon from "@mui/icons-material/Search";
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
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
    range: [dayjs().subtract(1, 'month').startOf('month'), dayjs().subtract(1, 'month').endOf('month')],
  }
];

const dateRangeOptions = dateRanges.map(range => range.label);

const customDateRange = {
  label: 'Custom Range',
  range: 'Custom'
};

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
  const [searchTerm, setSearchTerm] = useState("");
  const [prescriptions, setPrescriptions] = useState([]);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState(dateRanges[0].label);
  const [startDate, setStartDate] = useState(dayjs().startOf('day'));
  const [endDate, setEndDate] = useState(dayjs().endOf('day'));

  const fetchPrescriptions = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/medicare/v1/prescriptions", {
        params: {
          processed: checked,
          startDate: startDate.format('YYYY-MM-DD HH:mm:ss'),
          endDate: endDate.format('YYYY-MM-DD HH:mm:ss'),
          searchTerm: searchTerm?.length > 0 ? searchTerm : null
        }
      });
      setPrescriptions(response.data.sort((p1, p2) => p1.id - p2.id).map(pres => mappedPrescriptions(pres)));
    } catch (err) {
      console.error("Error fetching prescriptions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptions();

    return () => {
      setPrescriptions([]);
    };

  }, [checked, startDate, endDate, searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDateRangeSelect = (event) => {
    const selectedRange = event.target.value;
    setSelectedDateRange(selectedRange);
    if (dateRangeOptions.includes(selectedRange)) {
      const range = dateRanges.find((range) => range.label === selectedRange);
      setStartDate(range.range[0]);
      setEndDate(range.range[1]);
    }
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    const range = dateRanges.find((range) => range.range[0].isSame(date, 'day') &&
      range.range[1].isSame(endDate, 'day')) ?? customDateRange;
    setSelectedDateRange(range.label);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    const range = dateRanges.find((range) => range.range[0].isSame(startDate, 'day') &&
      range.range[1].isSame(date, 'day')) ?? customDateRange;
    setSelectedDateRange(range.label);
  };

  const handleRefresh = () => {
    fetchPrescriptions();
  };

  return (
    <>
      <Stack direction={"row"} alignItems={"center"} justifyContent={"flex-start"} spacing={1} sx={{mb: 4}}>
        <Typography fontSize={30} fontWeight={550}>
          {`${checked ? "Processed Prescriptions" : "New Prescriptions"}`}
        < /Typography>
        {!loading &&
          <Tooltip title="Refresh prescriptions">
            <IconButton onClick={handleRefresh} color={"primary"}>
              <RefreshRoundedIcon/>
            </IconButton>
          </Tooltip>
        }
        {loading && <CircularProgress size={15}/>}
        {loading && <Typography fontSize={13}>Refetching prescriptions...</Typography>}
      </Stack>
      <Stack direction={"row"} justifyContent="space-between" alignItems="center">
        <Grid container justifyContent="flex-start" alignItems="flex-end" sx={{mb: 3}} direction={"row"}
              spacing={3}>
          <Grid item>
            <TextField
              id="search-prescriptions"
              label="Search"
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon/>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item>
            <Select
              value={selectedDateRange ?? ''}
              onChange={handleDateRangeSelect}
              sx={{minWidth: 160}}
            >
              {dateRangeOptions.map((range, index) => (
                <MenuItem key={index} value={range}>
                  {range}
                </MenuItem>
              ))}
              <MenuItem value={customDateRange.label}>
                {customDateRange.label}
              </MenuItem>
            </Select>
          </Grid>
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={handleStartDateChange}
                  maxDate={endDate || undefined}
                  // renderInput={(params) => <TextField {...params} sx={{width: '100%'}}/>}
                  slotProps={{textField: {variant: 'outlined'}}}
                  sx={{paddingRight: 1}}
                />
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={handleEndDateChange}
                  minDate={startDate || undefined}
                  // renderInput={(params) => <TextField {...params} sx={{width: '100%'}}/>}
                  slotProps={{textField: {variant: 'outlined'}}}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
        </Grid>
        <FormControlLabel
          control={<Switch checked={checked} onChange={handleChange}/>}
          label={'Processed'}
        />
      </Stack>
      <Paper elevation={1} sx={{padding: 2}}>
        {loading && <Typography>Loading ...</Typography>}
        {!loading && <Table columns={columns} rows={prescriptions}/>}
      </Paper>
    </>
  );
};

export default Prescriptions;