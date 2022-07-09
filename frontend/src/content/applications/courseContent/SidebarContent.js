import { useState } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMoreTwoTone';
import YouTubeIcon from '@mui/icons-material/YouTube';


const RootWrapper = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(2.5)};
  `
);




function SidebarContent() {
  const [state, setState] = useState({
    invisible: true
  });

  const [menuToggle, setMenuToggle] = useState(false);
  const toggleMenu = () => {
    setMenuToggle((Open) => !Open);
  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked
    });
  };


  return (
    <RootWrapper>
      <Typography sx={{ mb: 1, mt: 2 }} variant="h3">
        Course Content
      </Typography>
        <Accordion sx={{ width: '100%',border: '1px solid rgba(255, 255, 255, 0.3)',borderRadius:'5px',marginBottom:'10px' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h4">👉 Introduction and Setup</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{borderTop:'1px solid rgba(255, 255, 255, 0.3)',display: 'flex',}}>
          <YouTubeIcon /> 
            <Typography sx={{marginLeft:'10px'}}>
              Course Video
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ width: '100%',border: '1px solid rgba(255, 255, 255, 0.3)',borderRadius:'5px',marginBottom:'10px' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h4">👉 What is JavaScript</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{borderTop:'1px solid rgba(255, 255, 255, 0.3)',display: 'flex',}}>
          <YouTubeIcon /> 
            <Typography sx={{marginLeft:'10px'}}>
            Content Video
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ width: '100%',border: '1px solid rgba(255, 255, 255, 0.3)',borderRadius:'5px',marginBottom:'10px' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h4">👉 Setting Up the Environment</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{borderTop:'1px solid rgba(255, 255, 255, 0.3)',display: 'flex',}}>
          <YouTubeIcon /> 
            <Typography sx={{marginLeft:'10px'}}>
            Content Video
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ width: '100%',border: '1px solid rgba(255, 255, 255, 0.3)',borderRadius:'5px',marginBottom:'10px' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h4">👉 Variables and Constants</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{borderTop:'1px solid rgba(255, 255, 255, 0.3)',display: 'flex',}}>
          <YouTubeIcon /> 
            <Typography sx={{marginLeft:'10px'}}>
              Course Video
            </Typography>
          </AccordionDetails>
        </Accordion>
    </RootWrapper>
  );
}

export default SidebarContent;
