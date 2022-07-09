
import { Helmet } from 'react-helmet-async';
import {useSelector,useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import Footer from 'src/components/Footer';

import { Container, Grid } from '@mui/material';
import ProfileCover from '../Users/profile/ProfileCover';
import RecentActivity from '../Users/profile/RecentActivity';
import Instructures from '../Users/profile/Instructures';
import Courses from '../Users/profile/Courses';
import AddCourse from '../Users/profile/AddCourse';
import GroupInfo from '../Users/profile/GroupInfo';
import { useEffect } from 'react';

import {loadCurrentCommunity} from '../../../store/community';

function Community() {
  const dispatch=useDispatch();
  const {community_id}=useParams();

  useEffect(()=>{
    dispatch(loadCurrentCommunity(community_id));
  },[])

  const { loading,current_community } = useSelector(state => state.community);

  if(loading) return <div>Loading.......</div>

  else return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={8}>
            <ProfileCover info={current_community} type="community" />
          </Grid>
          <Grid item xs={12} md={4}>
            <RecentActivity recent={current_community?.course.length>0?current_community?.course[0]:0} />
          </Grid>
          <Grid item xs={12} md={8}>
             <Instructures admin={current_community?.admin} members={current_community?.member} />
          </Grid>
          <Grid item xs={12} md={4}>
             <GroupInfo total_student={current_community?.total_student} total_course={current_community?.total_course} />
          </Grid>
          <Grid item xs={12} md={9}>
            <Courses courses={current_community?.course} role={2}/>
          </Grid>
            <Grid item xs={12} md={3}>
              <AddCourse title="Add Course" link={`/home/${current_community?.community_id}/create_course`} />
            </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Community;
