import { useEffect } from 'react';

import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';

import { Container, Grid } from '@mui/material';

import ProfileCover from './ProfileCover';
import RecentActivity from './RecentActivity';
import Content from './Content';
import PopularTags from './GroupInfo';
import MyCards from './Comment';
import Addresses from './AddCourse';
import {useParams} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {loadCurrentcourse} from '../../../store/course';
import swl from 'sweetalert';

function CourseInfo() {
  const {course_id}=useParams();
  const dispatch=useDispatch();
  const {loading,current_course,error}=useSelector(state=>state.course);
  const {user}=useSelector(state=>state.auth);

  useEffect(()=>{
    if(error){
      swal("Can not Open", error, "error");
    }
  })

  useEffect(()=>{
    dispatch(loadCurrentcourse(course_id));
  },[course_id])

  if(loading) return <div>Loading......</div>

  else return (
    <>
      <Helmet>
        <title>User Details - Management</title>
      </Helmet>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          // justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={8}>
            <ProfileCover user={user} course={current_course&&current_course} />
          </Grid>
          <Grid item xs={12} md={4}>
            <RecentActivity videoLink={current_course?.videoLink} role={user.user.role} isAdmin={current_course?.admin===user.user.user_id?true:false}/>
          </Grid>
          <Grid item xs={12} md={8}>
            <Content content={current_course?.content} />
          </Grid>
          <Grid item xs={12} md={8}>
            <MyCards />
          </Grid>
          
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default CourseInfo;
