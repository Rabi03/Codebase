import { Typography, Avatar, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function PageHeader({user}) {


  const theme = useTheme();

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{ mr: 2, width: theme.spacing(8), height: theme.spacing(8) }}
          variant="rounded"
          alt={user.name}
          src={user.image}
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Welcome, {user.name}!
        </Typography>
        <Typography variant="h5">
        {user.role===1?"Learning comes to you":"Create an Engaging Course/Community"}
        </Typography>
        <Typography variant="subtitle2">
        {user.role===1?"Attain a world of knowledge — at home or on the go.":"Let knowledge spread around the world"}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
