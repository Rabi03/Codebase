import { useRef, useState } from 'react';
import {
  Button,
  Card,
  Box,
  CardHeader,
  Menu,
  MenuItem,
  Typography,
  CardContent,
  IconButton,
  CardActions,
  Grid,
  Avatar,
  Link
} from '@mui/material';

import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import CloseIcon from '@mui/icons-material/Close';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Rating from '@mui/material/Rating';
import ReactPlayer from 'react-player';
import {useNavigate} from 'react-router-dom';

function Courses({course}) {
  const navigate=useNavigate()
  const [playVideo, setPlayVideo] = useState(false);

  return (
    <Card sx={{ height: '100%', backgroundImage: `linear-gradient(to right bottom,#242526 40%,rgba(0,0,0,0.3) 60%),url(${course.image})`, backgroundSize: '100% 100%' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ backgroundColor: 'red' }} src={course.image} />
        }
        action={
          playVideo &&
          <IconButton aria-label="close" onClick={() => setPlayVideo(false)}>
            <CloseIcon />
          </IconButton>
        }
        title={<Link href={`/home/community/${course.community_id}`} underline="hover">{course.community_name}</Link>}
        subheader={new Date(course.date).toDateString()}
      />
      <CardContent sx={{ pt: 0 }}>
        {!playVideo ?
          <Grid container spacing={0}>
            <Grid item xs={8} md={8}>
              <div>
                <CardHeader
                  title={<Link href={`/home/course/${course.course_id}`} underline="hover">{course.promo_name}</Link>}
                  subheader={course.promo_description.substr(0,100)+"....."}
                />
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Rating
                      name="size-small"
                      size="small"
                      value={4}

                    />
                    <Typography>

                      (1212220)
                    </Typography>
                  </Box>
                  <Typography>
                    20 total hours . 16 lectures . All Levels
                  </Typography>
                </CardContent>

              </div>

            </Grid>
            <Grid item xs={4} md={4}
              align="center"
              style={{ marginTop: 'auto', marginBottom: 'auto' }}>
              <IconButton aria-label="play/pause" sx={{ border: '1px solid white', borderRadius: '100%' }} onClick={() => setPlayVideo(true)}>
                <PlayArrowIcon sx={{ height: 50, width: 50 }} />
              </IconButton>

            </Grid>
          </Grid>
          :
          <ReactPlayer url={course.videoLink} controls playing width='100%' height="250px" style={{ borderRadius: '10px', backgroundSize: '100% 100%' }} />
        }

      </CardContent>
      {!playVideo &&
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      }
    </Card>
  );
}

export default Courses;
