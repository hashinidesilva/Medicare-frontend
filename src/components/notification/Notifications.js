import {Fragment, useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {Badge, IconButton, Menu, MenuItem} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PrescriptionContext from '../../store/prescription-context';
import api from '../api/api';

const Notifications = () => {
  const [anchorEl, setAnchorEl] = useState();
  const [prescriptions, setPrescriptions] = useState([]);
  const prescriptionCtx = useContext(PrescriptionContext);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const size = prescriptions.length;

  useEffect(async () => {
    const response = await api.get('/prescriptions',
        {
          params: {processed: false},
        });
    const data = await response.data;
    setPrescriptions(data);
    prescriptionCtx.addItems(data);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItemClickHandler = (id) => {
    handleClose();
    navigate(`prescriptions/${id}`);
  };

  return (
      <Fragment>
        <IconButton
            size="large"
            aria-label="show new notifications"
            color="inherit"
            onClick={handleClick}
        >
          <Badge badgeContent={size} color="error">
            <NotificationsIcon/>
          </Badge>
        </IconButton>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
        >
          {prescriptions.map(prescription => (
              <MenuItem
                  key={prescription.id}
                  onClick={menuItemClickHandler.bind(null, prescription.id)}>
                {`New prescription is ready for ${prescription.patient.name}`}
              </MenuItem>
          ))}
        </Menu>
      </Fragment>
  );
};

export default Notifications;