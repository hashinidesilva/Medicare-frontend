import React, {useEffect, useState} from 'react';

import dayjs from 'dayjs';
import {Grid, MenuItem, Select, Typography} from '@mui/material';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {
  AttachMoneyOutlined,
  AssignmentOutlined,
  PersonAddOutlined,
} from '@mui/icons-material';
import AnalyticInfo from './AnalyticInfo';
import useApi from '../../hooks/useAPI';

const dateRanges = [
  {
    label: 'Today',
    range: [dayjs().startOf('day'), dayjs().endOf('day')],
  },
  {
    label: 'Yesterday',
    range: [
      dayjs().subtract(1, 'day').startOf('day'),
      dayjs().subtract(1, 'day').endOf('day')],
  },
  {
    label: 'Last 7 Days',
    range: [dayjs().subtract(6, 'day').startOf('day'), dayjs().endOf('day')],
  },
  {
    label: 'Last 30 Days',
    range: [dayjs().subtract(29, 'day').startOf('day'), dayjs().endOf('day')],
  },
  {
    label: 'This Month',
    range: [dayjs().startOf('month'), dayjs().endOf('month')],
  },
  {
    label: 'Last Month',
    range: [
      dayjs().subtract(1, 'month').startOf('month'),
      dayjs().subtract(1, 'month').endOf('month')],
  },
];

const dateRangeOptions = dateRanges.map(range => range.label);

const customDateRange = {
  label: 'Custom Range',
  range: 'Custom',
};

const Analytics = () => {
  const [selectedDateRange, setSelectedDateRange] = useState(
      dateRanges[0].label);
  const [startDate, setStartDate] = useState(dayjs().startOf('day'));
  const [endDate, setEndDate] = useState(dayjs().endOf('day'));
  const [loading, setLoading] = useState(false);
  const [analytics, setAnalytics] = useState({});
  const apiRequest = useApi();

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const response = await apiRequest({
        method: 'GET',
        url: '/analytics',
        params: {
          startDate: startDate.format('YYYY-MM-DD HH:mm:ss'),
          endDate: endDate.format('YYYY-MM-DD HH:mm:ss'),
        },
      });
      if (response.status === 200) {
        setAnalytics(response.data);
      }
    } catch (err) {
      console.error('Error fetching analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
    return () => {
      setAnalytics({});
    };
  }, [startDate, endDate]);

  const handleDateRangeSelect = (event) => {
    const selectedRange = event.target.value;
    setSelectedDateRange(selectedRange);
    if (dateRangeOptions.includes(selectedRange)) {
      const range = dateRanges.find((range) => range.label === selectedRange);
      setStartDate(range.range[0]);
      setEndDate(range.range[1]);
    }
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    const range = dateRanges.find(
        (range) => range.range[0].isSame(date, 'day') &&
            range.range[1].isSame(endDate, 'day')) ?? customDateRange;
    setSelectedDateRange(range.label);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    const range = dateRanges.find(
        (range) => range.range[0].isSame(startDate, 'day') &&
            range.range[1].isSame(date, 'day')) ?? customDateRange;
    setSelectedDateRange(range.label);
  };

  return (
      <>
        <Typography fontSize={30} fontWeight={550}
                    sx={{mb: 4}}>Analytics</Typography>
        <Grid container justifyContent="flex-start" alignItems="flex-end"
              sx={{mb: 3}} direction={'row'} spacing={3}>
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
                    slotProps={{textField: {variant: 'outlined'}}}
                    sx={{paddingRight: 1}}
                />
                <DatePicker
                    label="End Date"
                    value={endDate}
                    onChange={handleEndDateChange}
                    minDate={startDate || undefined}
                    slotProps={{textField: {variant: 'outlined'}}}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Grid container spacing={4} alignItems={'center'}
              justifyContent={'space-between'}>
          <Grid item xs={4}>
            <AnalyticInfo Icon={AttachMoneyOutlined}
                          count={`Rs ${analytics?.totalPrescriptionRevenue}`}
                          title={'Total Revenue'}
                          loading={loading}/>
          </Grid>
          <Grid item xs={4}>
            <AnalyticInfo Icon={AssignmentOutlined}
                          count={analytics?.totalPrescriptions}
                          title={'Total Prescriptions Count'}
                          loading={loading}/>
          </Grid>
          <Grid item xs={4}>
            <AnalyticInfo Icon={PersonAddOutlined}
                          count={analytics?.totalPatients}
                          title={'Total New Patients Count'}
                          loading={loading}/>
          </Grid>
        </Grid>

      </>
  );
};

export default Analytics;