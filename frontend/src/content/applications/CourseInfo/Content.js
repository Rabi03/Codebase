import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CardContent,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMoreTwoTone';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FolderIcon from '@mui/icons-material/Folder';

function Content({ content }) {


  return (
    <Card>
      <CardHeader title="Course Content" subheader="105 lectures • 12h 59m total length" />
      <Divider />
      <CardContent>
        {content?.map(con => (
          <Box sx={{ width: '100%', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '5px' }}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ borderBottom: '1px solid rgba(255,255,255,0.3)' }}
              >
                <Typography variant="h4">👉 {con.name}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <YouTubeIcon />
                  <Typography sx={{ marginLeft: '10px' }}>
                    Content Video
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', }}>
                  <FolderIcon />
                  <Typography sx={{ marginLeft: '10px', alignItems: 'center' }}>
                    Files
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
        ))}
      </CardContent>

    </Card>
  );
}

export default Content;
