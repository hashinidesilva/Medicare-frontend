import React, {useState} from 'react';

import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Switch,
  FormControlLabel, Stack,
} from '@mui/material';
import Swal from 'sweetalert2';
import api from '../api/api';

const ChangePasswordModel = ({open, handleClose}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const apiBaseUrl = window.config.apiBaseUrl;

  const handleChangePassword = async () => {
    const isPasswordMatched = !(newPassword.trim().length > 0 &&
        confirmPassword.trim().length > 0 && newPassword !== confirmPassword);
    if (!isPasswordMatched) {
      setErrorMessage('Password confirmation doesn\'t match.');
    } else {
      try {
        setLoading(true);
        setErrorMessage('');
        const response = await api.post(
            `${apiBaseUrl}/medicare/v1/change-password`,
            {
              oldPassword: currentPassword,
              newPassword,
            },
        );
        console.log('Password changed' + response.data);
        setErrorMessage('');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        handleClose();
        const auth = JSON.parse(sessionStorage.getItem('auth'));
        if (auth) {
          auth.password = newPassword;
          sessionStorage.setItem('auth', JSON.stringify(auth));
        }
        Swal.fire({
          icon: 'success',
          title: 'Password changed',
          text: 'Your password has been updated successfully.',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            handleClose();
          }
        });
      } catch (error) {
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage('Error changing password');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleConfirmPassword = (event) => {
    setErrorMessage('');
    setConfirmPassword(event.target.value);
  };

  const handleNewPassword = (event) => {
    setErrorMessage('');
    setNewPassword(event.target.value);
  };

  const handleCurrentPassword = (event) => {
    setErrorMessage('');
    setCurrentPassword(event.target.value);
  };

  const handleChange = (event) => {
    setShowPassword(event.target.checked);
  };

  return (
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-modal-title" variant="h6"
                      component="h2">
            Change Password
          </Typography>
          <TextField
              label="Current Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
              value={currentPassword}
              onChange={handleCurrentPassword}
          />
          <TextField
              label="New Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
              value={newPassword}
              onChange={handleNewPassword}
          />
          <TextField
              label="Confirm New Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={handleConfirmPassword}
          />
          {errorMessage?.trim().length > 0 && (
              <Typography color="red" variant={'body1'}
                          sx={{paddingBottom: '1rem'}}>
                {errorMessage}
              </Typography>
          )}
          <Stack direction={'row'} alignItems={'center'}
                 justifyContent={'space-between'}>
            <Button variant="contained" color="primary"
                    disabled={currentPassword.trim().length === 0 ||
                        newPassword.trim().length === 0 ||
                        confirmPassword.trim().length === 0 || loading}
                    onClick={handleChangePassword} sx={{mt: 2}}>
              Change Password
            </Button>
            <FormControlLabel
                control={<Switch size="small" checked={showPassword}
                                 onChange={handleChange}/>}
                label={'Show password'}
            />
          </Stack>
        </Box>
      </Modal>
  );
};

export default ChangePasswordModel;
