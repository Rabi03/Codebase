import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  Grid,
  Button
} from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function Instructures({ admin,members }) {


  const instructures = [
    {
      name: 'Munroe Dacks',
      jobtitle: 'Senior Python Developer',
      avatar: '/static/images/avatars/1.jpg'
    },
    {
      name: 'Gunilla Canario',
      jobtitle: 'Javascript Developer',
      avatar: '/static/images/avatars/2.jpg'
    },
    {
      name: 'Rowena Geistmann',
      jobtitle: 'Nodejs Developer',
      avatar: '/static/images/avatars/3.jpg'
    },
    {
      name: 'Ede Stoving',
      jobtitle: 'Database Administrator',
      avatar: '/static/images/avatars/4.jpg'
    },
    {
      name: 'Crissy Spere',
      jobtitle: 'Full Stack Developer',
      avatar: '/static/images/avatars/5.jpg'
    }
  ];

  return (
    <Card>
      <CardHeader title="Instructures Feed" />
      <Divider />
      <Box p={2}>
        <Grid container spacing={0}>
          {members?.map((instructor) => (
            <Grid key={instructor.name} item xs={12} sm={6} lg={4}>
              <Box p={3} display="flex" alignItems="flex-start">
                <Avatar src={instructor.image} />
                <Box pl={2}>
                  <Typography variant="h4" gutterBottom>
                    {instructor.name}
                  </Typography>
                  <Typography color="text.primary" sx={{ pb: 2 }}>
                    {instructor.profession}
                  </Typography>
                  {instructor.user_id===admin&&
                  <Button variant="contained" color="success" size="small">
                      Admin
                    </Button>
                    }
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Card>
  );
}

export default Instructures;
