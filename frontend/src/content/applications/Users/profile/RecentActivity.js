import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  CardContent,
  Grid,
  Rating
} from '@mui/material';


function RecentActivity({recent}) {

  if(recent===0) return <Card>
    <CardHeader title="Recent Activity" />
      <Divider />
      <CardContent sx={{justifyContent:'center'}}>
        <Typography>
          No recent course
        </Typography>
      </CardContent>
  </Card>
  else return (
    <Card>
      <CardHeader title="Recent Activity" />
      <Divider />
      <Box px={2} py={4} display="flex" alignItems="flex-start">
        <Card sx={{ height: '100%', backgroundImage: `linear-gradient(to right bottom,#242526 40%,rgba(0,0,0,0.3) 60%),url("${recent.image}")`, backgroundSize: '100% 100%' }}>
          <CardHeader
            title={recent.name}
            subheader={recent.description.substr(0, 100) + "...."}
          />
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Rating
                name="size-small"
                size="small"
                value={recent.h_rating}
              />
              <Typography>

                (1212220)
              </Typography>
            </Box>
            <Typography>
              20 total hours . 16 lectures . All Levels
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Card>
  );
}

export default RecentActivity;
