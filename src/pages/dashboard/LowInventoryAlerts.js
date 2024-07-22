import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import axios from 'axios';
import {
  Box,
  Button,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CustomProgress from '../../components/UI/CustomProgress';

function LowInventoryAlerts() {
  const [lowInventoryItems, setLowInventoryItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMedicines = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: 'GET',
        url: '/medicines', params: {lowInventory: true},
      });
      if (response.status === 200) {
        setLowInventoryItems(
            response.data.sort((med1, med2) => med2.id - med1.id));
      }
    } catch (err) {
      console.error('Error fetching low inventories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
    return () => {
      setLowInventoryItems([]);
    };
  }, []);

  return (
      <Paper
          sx={{
            minWidth: 275,
            minHeight: '40vh',
            paddingTop: 3,
            paddingX: 3,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 2,
          }}>
        <Typography sx={{fontSize: 15, fontWeight: 700}} gutterBottom>
          Low Inventory Alerts
        </Typography>
        {loading && <CustomProgress/>}
        {!loading && (lowInventoryItems.length === 0 ? (
            <Box sx={{
              width: '100%',
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Typography sx={{fontSize: 15}} color="text.secondary"
                          gutterBottom>
                No items
              </Typography>
            </Box>
        ) : (
            <List sx={{marginTop: 1}}>
              {lowInventoryItems.slice(0, 3).map((item, index) => (
                  <ListItem
                      key={index}
                      style={{paddingBottom: 0, paddingTop: 0}}>
                    <ListItemIcon style={{minWidth: '20px'}}>
                      <ReportProblemIcon
                          color="error"
                          style={{marginRight: '8px'}}/>
                    </ListItemIcon>
                    <ListItemText
                        primary={item.name}
                        secondary={`Units left: ${item.units}`}
                        primaryTypographyProps={{style: {fontSize: '14px'}}}
                        secondaryTypographyProps={{style: {fontSize: '12px'}}}/>
                  </ListItem>
              ))}
              {lowInventoryItems.length > 3 &&
                  <Button
                      component={Link} to="/medicines/low-inventory"
                      sx={{fontSize: 12, marginTop: 2}}>
                    Show More
                  </Button>}
            </List>
        ))}
      </Paper>
  );
}

export default LowInventoryAlerts;