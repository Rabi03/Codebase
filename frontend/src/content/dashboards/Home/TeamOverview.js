import {
  Card,
  Box,
  Grid,
  Typography,
  Avatar,
  Badge,
  Tooltip,
  useTheme,
  LinearProgress
} from '@mui/material';

import { styled } from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';


const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    width: ${theme.spacing(7)};
    height: ${theme.spacing(7)};
`
);


function TeamOverview({topCommunity}) {
  const navigate=useNavigate()

  return (
    <Grid container spacing={3}>
      {topCommunity&&topCommunity.map((community)=>
      <Grid item xs={12} md={4}>
        <Card 
        sx={{ 
        p: 2.5 ,
        backgroundImage: `linear-gradient(to right bottom,#242526 60%,rgba(0,0,0,0.5) 40%),url("${community.cover_image}")`,
        backgroundSize:'100% 100%',
        cursor:'pointer'
        }}
        onClick={()=>navigate(`/home/community/${community.community_id}`)}
        >
          <Box display="flex" alignItems="center" pb={3}>
            <AvatarWrapper
              alt="Remy Sharp"
              src={community.group_image}
            />
            <Box sx={{ ml: 1.5 }}>
              <Typography variant="h4" noWrap gutterBottom>
                {community.name}
              </Typography>
              <Typography variant="subtitle2" noWrap>
                {community.purpose}
              </Typography>
            </Box>
          </Box>

          <Typography variant="subtitle2" gutterBottom>
            {community.total_student} Total students . {community.total_course} Courses
          </Typography>
        </Card>
      </Grid>
      )}
    </Grid>
  );
}

export default TeamOverview;
