import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import axios from 'axios';
import {
  Box,
  Button, FormControl,
  IconButton,
  InputAdornment, InputLabel, MenuItem,
  OutlinedInput,
  Paper, Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';

const Login = ({handleAuthentication, handleTownSelection}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const apiBaseUrl = window.config.apiBaseUrl;
  // console.log('ENV VAR: ' + apiBaseUrl);
  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      setErrorMessage('');
      const response = await axios.post(
          `${apiBaseUrl}/medicare/v1/login`, {
            username,
            password,
          });

      if (response.status === 200) {
        handleAuthentication(true);
        handleTownSelection(city);
        localStorage.setItem('city', city);
        localStorage.setItem('authenticated', true);
        sessionStorage.setItem('auth', JSON.stringify({username, password}));
        console.log('Login successful', response.data);
        navigate('/');
      }
    } catch (error) {
      console.log('Login failed',
          error.response ? error.response.data : error.message);
      localStorage.setItem('authenticated', false);
      setErrorMessage('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
      <Box sx={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#f2f3f5',
      }}>
        <Box sx={{
          width: '100%',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Paper elevation={3}
                 sx={{width: '30%', padding: 4, justifyContent: 'center'}}>
            <Stack sx={{justifyContent: 'center', alignItems: 'center'}}>
              <img src="/bklogo.jpeg" alt="Logo"
                   style={{height: 50, width: 90, paddingBottom: '0.5rem'}}/>
              <Typography
                  color="#3d3f94" fontSize={30} fontWeight={550}
                  sx={{paddingBottom: `${errorMessage ? '1rem' : '2rem'}`}}>
                Login
              </Typography>
            </Stack>
            {errorMessage?.trim().length > 0 && (
                <Typography color="red" variant={'body1'}
                            sx={{paddingBottom: '1rem'}}>
                  {errorMessage}
                </Typography>
            )}
            <Stack spacing={4}>
              <TextField
                  fullWidth
                  id="username"
                  label="Username"
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
              />
              <FormControl sx={{m: 1}} variant="outlined">
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                        >
                          {password.trim() !== '' &&
                              (!showPassword ? <VisibilityOff/> :
                                  <Visibility/>)}
                        </IconButton>
                      </InputAdornment>
                    }
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    label="Password"
                />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="city">City</InputLabel>
                <Select
                    id="city-select"
                    value={city}
                    label="City"
                    onChange={(event) => setCity(event.target.value)}
                >
                  <MenuItem value={1}>Ella</MenuItem>
                  <MenuItem value={2}>Matara</MenuItem>
                </Select>
              </FormControl>
              <Button
                  variant="contained"
                  disabled={username.trim() === '' || password.trim() === '' ||
                      loading}
                  onClick={handleLogin}
              >
                Login
              </Button>
            </Stack>
          </Paper>
        </Box>
      </Box>
  );
};

export default Login;