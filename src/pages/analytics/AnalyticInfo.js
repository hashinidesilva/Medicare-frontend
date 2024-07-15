import React from 'react';

import {Card, Stack, Typography} from '@mui/material';
import CustomProgress from '../../components/UI/CustomProgress';

const AnalyticInfo = ({Icon, count, title, loading}) => {
  return (
      <Card sx={{
        borderRadius: '12px',
        paddingX: '20px',
        paddingTop: '20px',
        paddingBottom: '12px',
      }}>
        {loading && <CustomProgress/>}
        {!loading &&
            <Stack direction={'row'} spacing={3}
                   sx={{alignItems: 'flex-start', paddingBottom: '10px'}}>
              <Icon
                  fontSize={'medium'}
                  sx={{
                    backgroundColor: '#e8eaf3',
                    borderRadius: '50%',
                    color: '#4860bd',
                    padding: '8px',
                  }}/>
              <Stack spacing={3}>
                <Typography variant={'h5'}
                            sx={{fontWeight: 600}}>{count}</Typography>
                <Typography variant={'subtitle2'}>{title}</Typography>
              </Stack>
            </Stack>
        }
      </Card>
  );
};

export default AnalyticInfo;