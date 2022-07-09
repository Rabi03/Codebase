import React, { useState,useEffect } from 'react';
import { Container, Grid, Card, CardContent, CardHeader, Input, TextField, Typography } from '@mui/material';
import AddContent from './AddContent';

import { LoadingButton } from '@mui/lab';
import AddIcon from '@mui/icons-material/Add';
import {useDispatch,useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import swal from 'sweetalert';

import {createcourse,clearError} from '../../../store/course';

export default function CreateCourse() {
  const dispatch = useDispatch();
  const {community_id}=useParams();
  const [name,SetName]=useState('');
  const [description,setDescription]=useState('');
  const [videoLink,setVideoLink]=useState('');
  const [image,setImage]=useState('');
  const [picLoading, setPicLoading] = useState('');

  const [content,setContent]=useState([]);

  const {loading,error,message}=useSelector(state=>state.course);

  useEffect(()=>{
    if(error){
      swal("Can not create community", error, "error");
      dispatch(clearError());
    }
    if(message){
      swal("Codebase", message, "success");
    }
  })


  const uploadDemoImage = (pics) => {
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
      swal("Could not upload image", "Please select an image", "error");
      setPicLoading(false);
      return;
    }
  };

  const handleSubmit=()=>{
    dispatch(createcourse(community_id,{course:{name,description,videoLink,image},content}));
  }


  return (
    <Container sx={{ mt: 3, mb: 3 }} maxWidth="lg">
      {/* Add Course Description */}
      <Card>
        <CardHeader 
        action={
          <LoadingButton variant="contained" startIcon={<AddIcon />} loading={loading} onClick={handleSubmit} >
            Create
          </LoadingButton>
        }
        title="Course Description" 
        subheader="Please fill all the fields" />
        <CardContent>
          <TextField 
          value={name} 
          id="outlined-basic" 
          label="Course Name" 
          variant="outlined" 
          sx={{ width: '100%', marginBottom: '15px' }} 
          onChange={e=>SetName(e.target.value)}
          />
          <TextField 
          value={description} 
          multiline maxRows={8} 
          id="outlined-basic" 
          label="Course Description(markdown text,follow the below link)" 
          variant="outlined" 
          sx={{ width: '100%', marginBottom: '10px' }} 
          onChange={e=>setDescription(e.target.value)}
          />
          <Typography variant="h6" sx={{ marginTop: '5px' }}>Click the link to create md text(<a href="https://markdownlivepreview.com/" target="_blank">https://markdownlivepreview.com/</a>)</Typography>
          <TextField value={videoLink} id="outlined-basic" label="Course Demo Video Link" variant="outlined" sx={{ width: '100%', marginBottom: '15px', marginTop: '10px' }} onChange={e=>setVideoLink(e.target.value)} />
          <Typography variant="h6" sx={{ marginBottom: '10px' }}>Course Demo Image</Typography>
          <Input type="file" id="outlined-basic" label="Course File drive Link" variant="outlined" fullWidth onChange={e => uploadDemoImage(e.target.files[0])}/>
        </CardContent>
      </Card>

      {/* Add Content */}

      <AddContent content={content} addContent={con=>setContent(c=>[...c,con])} />
    </Container>
  )
}
