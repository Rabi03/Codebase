import { ChangeEvent, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import Footer from 'src/components/Footer';
import { Container, Grid,Typography,IconButton } from '@mui/material';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {useNavigate} from 'react-router-dom'

import TeamOverview from './TeamOverview';
import Courses from './Courses';
import RightIcon from '@mui/icons-material/ChevronRight';
import LeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import {useDispatch,useSelector} from 'react-redux';
import {getPromotion,getTopCommunity} from '../../../store/home'
import {loadUser} from '../../../store/auth';
import swal from 'sweetalert';


function Home() {
  const dispatch =useDispatch();
  const navigate=useNavigate();
  const {loading,topCommunity,promotion,error} =useSelector(state=>state.home);
  const [skip,setSkip]=useState(0);
  const {user}=useSelector(state=>state.auth);


  useEffect(()=>{
    if(error){
      swal("Login Fails", error, "error");
    }

    dispatch(getPromotion)
    dispatch(getTopCommunity(skip*3))
    dispatch(loadUser())


  },[])



  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader user={user.user} />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          spacing={3}
        >
          <Grid item xs={12} sx={{justifyContent:'space-between',display:'flex'}}>
            <Grid align="center" sx={{marginTop:'auto'}}>
              <Typography variant="h4" component="h4">Top Community</Typography>
            </Grid>
            <Grid sx={{display:'flex'}}>
              <IconButton onClick={()=>setSkip(skip=>skip-1)}>
                <LeftIcon />
              </IconButton>
              <IconButton onClick={()=>setSkip(skip=>skip+1)}>
                <RightIcon />
              </IconButton>
            </Grid>
          </Grid>
              <Grid item xs={12}>
                <TeamOverview topCommunity={topCommunity?topCommunity:[]} />
              </Grid>
              {promotion?.map(promo=>(
              <Grid item xs={12} sm={6} md={6}>
              <Courses course={promo} />
            </Grid>
                ))}
              
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Home;
