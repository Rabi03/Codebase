import { ChangeEvent, useState } from 'react';
import {
  Box,
  Grid,
  Radio,
  FormControlLabel,
  Typography,
  Card,
  CardHeader,
  Divider,
  lighten,
  CardActionArea,
  CardContent,
  CardMedia,
  Rating,
  Avatar
} from '@mui/material';
import {useNavigate} from 'react-router-dom';

function Courses({ role, courses }) {
  const navigate=useNavigate()


  return (
    <Card>
      <CardHeader
        subheader={courses?.length + ' total courses'}
        title="Courses"
      />
      <Divider />
      <Box p={3}>
        <Grid container spacing={2} sx={{justifyContent:'center'}}>
          {courses?.map((course) => (
            <Grid item xs={12} sm={role === 1 ? 4 : 8} >
              <Card sx={{ height: '100%',display:'flex' }} onClick={()=>navigate(`/home/course/${course.course_id}`)}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardHeader
                  title={course.name}
                  subheader={course.description.substr(0, 100) + "...."}
                />
                
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Rating
                      name="size-small"
                      size="small"
                      value={course.h_rating}

                    />
                    <Typography>

                      (1212220)
                    </Typography>
                  </Box>
                  <Typography>
                    20 total hours . 16 lectures . All Levels
                  </Typography>
                </CardContent>
                </Box>
                <CardMedia
                  component="img"
                  sx={{ width: 200,backgroundSize:'100% 100%' }}
                  image={course.image}
                  alt="Course Image"
                />
              </Card>
            </Grid>))}

        </Grid>
      </Box>
    </Card>
  );
}

export default Courses;
