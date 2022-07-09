import { Box, Avatar, Typography, Card, Divider, IconButton,Badge } from '@mui/material';
import { styled } from '@mui/material/styles';

import ScheduleTwoToneIcon from '@mui/icons-material/ScheduleTwoTone';
import ReactPlayer from 'react-player';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import FolderDownload from '@mui/icons-material/Folder';
import DownloadIcon from '@mui/icons-material/Download';

const markdown = `**This is an introductory course on Databases and SQL Querying. There are no pre-requisities for this course. If you are looking to get acquainted with the concept of Databases and Queries for maybe your next interview as an analyst, this is the right course for you. All you need is a windows machine and we will walk through step by step, right from setting up your environment to creating your first table to writing your first query. This course is structured in a way that you can follow along with me. At the end of this course, you should be comfortable writing simple queries including queries related to Dates, String manipulation, Aggregation etc.**.

##### What you’ll learn
* Query a database, Create Tables and Databases and be proficient with basic SQL querying
##### Are there any course requirements or prerequisites?
* There is absolutely no pre-requisites for the course. We will walk through very basic installation to setting up your environment to creating your first table and writing queries against it. All videos are recorded in Windows OS. You can however follow this course on MAC/Linux, if you have a Win VM setup.
##### Who this course is for:
* This course is for beginners with absolutely no experience is database. The course will make you familiar with SQL Syntax and introduce you to the concept of databases. No Prior Programming experience is required. This course is probably not for you if you're looking to learn more advanced and complex queries
`

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 19,
    border:'2px solid #1c1e21',
    padding: '0px',
  },
}));



function VideoContent() {



  return (
    <Box p={3}>
      <ReactPlayer url="https://www.youtube.com/watch?v=W6NZfCO5SIk" controls width="100%" height="370px" />
      
      <Box sx={{display: 'flex',flexDirection:'row',justifyContent: 'space-between'}}>
        <Typography variant="h4" sx={{mt:2}}>Section 1: Installing/Setting Up/SQL Management Studio</Typography>
        <IconButton>
        <StyledBadge badgeContent={<DownloadIcon style={{fontSize:'15px'}}/>} color="primary">
        <FolderDownload />
        </StyledBadge>
        </IconButton>
        </Box>
        <Typography variant="h5" sx={{mt:2}}>Description</Typography>
      <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]}/>

    </Box>
  );
}

export default VideoContent;
