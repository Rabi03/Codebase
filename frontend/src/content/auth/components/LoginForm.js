import { useState,useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Link, Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel, Box,Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import { Icon } from '@iconify/react';
import {useDispatch,useSelector} from 'react-redux';
import {loginUser} from '../../../store/auth';
import swal from 'sweetalert';



export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {loading,isAuthenticated,error}=useSelector(state => state.auth);

  useEffect(() =>{
    if(isAuthenticated){
      navigate('/home');
    }
    if(error){
      swal("Login Fails", error, "error");
    }
  })

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(name, password));
    
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          required
          fullWidth
          autoComplete="username"
          type="email"
          label="Email address"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <TextField
          required
          fullWidth
          autoComplete="current-password"
          type={showPassword ? 'text' : 'password'}
          label="Password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={()=>setShowPassword(!showPassword)} edge="end">
                  <Box component={Icon} icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading}>
        Login
      </LoadingButton>
      </Stack>



      
    </form>
  );
}
