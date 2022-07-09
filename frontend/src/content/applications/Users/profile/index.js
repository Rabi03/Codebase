
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';

import { Container, Grid } from '@mui/material';

import ProfileCover from './ProfileCover';
import RecentActivity from './RecentActivity';
import Feed from './Instructures';
import GroupInfo from './GroupInfo';
import Courses from './Courses';
import AddCourse from './AddCourse';
import { useSelector } from 'react-redux';
import Groups from './Groups';

function ManagementUserProfile() {

  const { user } = useSelector(state => state.auth)


  return (
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
            <ProfileCover info={user.user} type="profile" />
          </Grid>
          {user.user.role===2&&
          <Grid item xs={12} md={4}>
             <GroupInfo total_student={user?.total_student} total_course={user?.total_course} />
          </Grid>
          }
          {user.user.role ===1&&
          <Grid item xs={12} md={4}>
            <RecentActivity role={user.user.role} recent={user.user.course} />
          </Grid>
          }
          <Grid item xs={12} md={user.user.role === 1 ? 12 : 9}>
             <Groups role={user.user.role} groups={user.user.role===1?user.join_student:user.join_instructor} />
          </Grid>
          {user.user.role ===1&&
          <Grid item xs={12} md={12}>
            <Courses role={user.user.role} />
          </Grid>
          }
          {user.user.role === 2 &&
            <Grid item xs={12} md={3}>
              <AddCourse title="Create Community" link="/home/create_community" />
            </Grid>
          }
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ManagementUserProfile;
