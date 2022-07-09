import * as Yup from 'yup';
import { useState,useEffect } from 'react';
import { Link , useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment, Box, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import { Icon } from '@iconify/react'
import ChipInput from 'material-ui-chip-input'

import {useDispatch,useSelector} from 'react-redux'
import {registerUser,clearError} from '../../../store/auth'

import swal from 'sweetalert';

export default function RegisterForm() {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const {loading,isAuthenticated,error}=useSelector(state => state.auth);

  useEffect(() =>{
    if(isAuthenticated){
      navigate('/home');
    }
    if(error){
      swal("Authentication Fails", error, "error");
      dispatch(clearError());
    }
  })

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const [role, setRole] = useState('');
  const [profession, setProfession] = useState([]);
  const [description, setDescription] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [picLoading,setPicLoading]=useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let Profession=profession.join(',')
    dispatch(registerUser({name,email,password,image,role,Profession,description}))

   }

   const uploadImage = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      swal("Image Upload Fails", "Please upload corrent image file", "error");
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "qoe2mr3x");
        data.append("cloud_name", "dlm9bb0b4");
        fetch("https://api.cloudinary.com/v1_1/dlm9bb0b4/image/upload", {
          method: "post",
          body: data,
        })
        .then((res) => res.json())
        .then((data) => {
            setImage(data.url.toString());
            setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      swal("Could not upload image", "Please select an image", "success");
      setPicLoading(false);
      return;
    }
  };
  



  return (
    <form autoComplete="off" onSubmit={handleSubmit} style={{zIndex:10}}>
      <Stack spacing={3}>
        <TextField
          fullWidth
          required
          type='text'
          label="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <TextField
          fullWidth
          type="email"
          label="Email address"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}

        />

        <TextField
          fullWidth
          type={showPassword ? 'text' : 'password'}
          label="Password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}

          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                  <Box component={Icon} icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}

        />
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <FormControl fullWidth required>
            <InputLabel id="demo-simple-select-label">Join As</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={role}
              label="Join As"
              required
              onChange={e => setRole(e.target.value)}
            >
              <MenuItem value={1}>Student</MenuItem>
              <MenuItem value={2}>Instructor</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            type="file"
            required
            onChange={e=>uploadImage(e.target.files[0])}
          />
        </Stack>
        <ChipInput
          required={profession.length===0?true:false}
          value={profession}
          fullWidth
          onAdd={(chip) => setProfession(p=>[...p,chip])}
          onDelete={(chip, index) => handleTagDelete(chip, index)}
          placeholder='Ex. Student / Software Engineer / UI,UX Designer...'
          style={{ fontWeight: "bold", color: "white" }}
          label="Profession"
          InputLabelProps={{
            style: { fontWeight: "bold", color: "rgba(255,255,255,0.4)",padding:'10px'}
          }}
          InputProps={{
            style: { fontWeight: "bold", color: "white",border:'1px solid rgba(255,255,255,0.2)',padding:'10px',borderRadius:'10px'}
          }}
        />

        <TextField
          fullWidth
          type='text'
          label='Description'
          maxRows={5}
          multiline={true}
          onChange={e => setDescription(e.target.value)}
        />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={picLoading||loading}>
          Register
        </LoadingButton>
      </Stack>
    </form>
  );
}
