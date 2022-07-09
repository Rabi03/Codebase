import { ChangeEvent, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Avatar,
  Divider,
  Rating,
  Box
} from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

import { styled } from '@mui/material/styles';
import RefreshTwoToneIcon from '@mui/icons-material/RefreshTwoTone';
import AssignmentTwoToneIcon from '@mui/icons-material/AssignmentTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import BusinessCenterTwoToneIcon from '@mui/icons-material/BusinessCenterTwoTone';

const TimelineWrapper = styled(Timeline)(
  ({ theme }) => `
    margin-left: ${theme.spacing(2)};

    .MuiTimelineDot-root {
      left: -${theme.spacing(2)};
      margin-top: 0;
      top: ${theme.spacing(0.5)};
    }
    
    .MuiTimelineContent-root {
      padding-left: ${theme.spacing(4)};
    }
    
    
`
);


function Comments() {


  return (
    <Card>
      <CardHeader
        title="Comments"
      />
      <Divider />
      <CardContent>
      <Box>
      <CardHeader
        avatar={
          <Avatar sx={{ backgroundColor:'red'}} aria-label="recipe">
            R
          </Avatar>
        }
        title="Shrimp and Chorizo Paella"
        subheader={<Rating name="size-small" size="small" value={4} readOnly />}
      />
      <CardContent>
        <Typography variant="h5" color="text.primary" sx={{marginLeft:'50px',marginTop:'-30px'}}>
          This is a nice course.
          </Typography>
        </CardContent>
        </Box>
        <Box>
      <CardHeader
        avatar={
          <Avatar sx={{ backgroundColor:'red'}} aria-label="recipe">
            A
          </Avatar>
        }
        title="Shrimp and Chorizo Paella"
        subheader={<Rating name="size-small" size="small" value={4} readOnly />}
      />
      <CardContent>
        <Typography variant="h5" color="text.primary" sx={{marginLeft:'50px',marginTop:'-30px'}}>
          This is a nice course.
          </Typography>
        </CardContent>
        </Box>
      </CardContent>
    </Card>
  );
}

export default Comments;
