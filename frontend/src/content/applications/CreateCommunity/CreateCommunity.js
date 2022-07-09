import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, Input, TextField, Typography, Stack, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AddIcon from '@mui/icons-material/Add';
import swal from 'sweetalert';
import {useDispatch,useSelector} from 'react-redux';
import {createCommunity,clearError} from '../../../store/community';

export default function CreateCommunity() {
  const dispatch=useDispatch();
  const [name, setName] = useState('');
  const [group_image, setGroupImage] = useState('');
  const [description, setDescription] = useState('');
  const [cover_image, setCoverImage] = useState('');
  const [purpose, setPurpose] = useState('');
  const [picLoading, setPicLoading] = useState('');
  const {loading,message,error}=useSelector(state=>state.community);
  const {user}=useSelector(state=>state.auth);

  useEffect(()=>{
    if(error){
      swal("Can not create community", "Please fill all the fields", "error");
      dispatch(clearError());
    }
    if(message){
      swal("Codebase", message, "success");
    }
  })

  const uploadGroupImage = (pics) => {
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
          setGroupImage(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      swal("Could not upload image", "Please select an image", "error");
      setPicLoading(false);
      return;
    }
  };

  const uploadCoverImage = (pics) => {
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
          setCoverImage(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      swal("Could not upload image", "Please select an image", "error");
      setPicLoading(false);
      return;
    }
  };


  const handleSubmit=e=>{
    e.preventDefault();
    dispatch(createCommunity({name,group_image,description,cover_image,purpose,admin:user.user.user_id}));
  }




  return (
    <Card>
      <CardHeader
        action={
          <LoadingButton variant="contained" startIcon={<AddIcon />} loading={loading} onClick={handleSubmit} >
            Create
          </LoadingButton>
        }
        title="Create Community"
        subheader="Please fill all the fields" />
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h6">Community Name</Typography>
          <TextField
            id="outlined-basic"
            label="Community Name"
            variant="outlined"
            sx={{ width: '100%' }}
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Typography variant="h6">Community Image</Typography>
          <TextField type="file" id="outlined-basic" variant="outlined" fullWidth onChange={e => uploadGroupImage(e.target.files[0])} />
          <Typography variant="h6">Community Cover Image</Typography>
          <TextField type="file" id="outlined-basic" variant="outlined" fullWidth onChange={e => uploadCoverImage(e.target.files[0])} />
          <Typography variant="h6">Community Description (Max Length 200)</Typography>
          <TextField
            multiline
            InputProps={{readOnly:description.length>200?true:false}}
            maxRows={8}
            id="outlined-basic"
            label="Community Description(markdown text,follow the below link)"
            variant="outlined"
            sx={{ width: '100%', marginBottom: '10px' }}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <Typography variant="h6">Add Programming Language that your community will teach</Typography>
          <TextField
            multiline
            maxRows={8}
            id="outlined-basic"
            label="Ex: Python/MERN stack/MEAN stack/ C/C++ Community....."
            variant="outlined"
            sx={{ width: '100%', marginBottom: '10px' }}
            value={purpose}
            onChange={e => setPurpose(e.target.value)}
          />
        </Stack>
      </CardContent>
    </Card>
  )
}
