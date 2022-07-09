import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Card,
  Tooltip,
  Avatar,
  Button,
  IconButton,
  CardHeader,
  CardContent,
  Rating
} from '@mui/material';
import { styled } from '@mui/material/styles';

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const markdown = `#### **This is an introductory course on Databases and SQL Querying. There are no pre-requisities for this course. If you are looking to get acquainted with the concept of Databases and Queries for maybe your next interview as an analyst, this is the right course for you. All you need is a windows machine and we will walk through step by step, right from setting up your environment to creating your first table to writing your first query. This course is structured in a way that you can follow along with me. At the end of this course, you should be comfortable writing simple queries including queries related to Dates, String manipulation, Aggregation etc.**.

### What you’ll learn
* Query a database, Create Tables and Databases and be proficient with basic SQL querying
### Are there any course requirements or prerequisites?
* There is absolutely no pre-requisites for the course. We will walk through very basic installation to setting up your environment to creating your first table and writing queries against it. All videos are recorded in Windows OS. You can however follow this course on MAC/Linux, if you have a Win VM setup.
### Who this course is for:
* This course is for beginners with absolutely no experience is database. The course will make you familiar with SQL Syntax and introduce you to the concept of databases. No Prior Programming experience is required. This course is probably not for you if you're looking to learn more advanced and complex queries
`




const ProfileCover = ({ user,course }) => {

  return (
    <>
    <Card>
      <CardContent>
        <Typography variant="h3">{course?.name}</Typography>
        <Typography variant="h6">Start and Scale your Digital Marketing Agency on Fiverr with Hot Marketing Gigs and Up-To-Date Systems & Strategies</Typography>

        <Box sx={{ display: 'flex', alignItems: 'center',marginTop:'20px' }}>
        <Rating
          name="size-small"
          size="small"
          value={4}

        />
        <Typography>

          (1212220)
        </Typography>
      </Box>
      
      </CardContent>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" src={course?.group_image} />
        }
        title={course?.community_name}
        subheader={`${course?.total_student} Total students`}
      />
      
    </Card>
    <Card sx={{marginTop:'30px'}}>
      <CardContent>
    <Typography variant="h3" sx={{mt:2}}>Description</Typography>
      <ReactMarkdown children={course?.description} remarkPlugins={[remarkGfm]}/>
      </CardContent>
    </Card>
    
    </>
  );
};


export default ProfileCover;
