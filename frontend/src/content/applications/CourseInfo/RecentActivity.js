import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  useTheme,
  Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Reactplayer from 'react-player'
import GroupIcon from '@mui/icons-material/Group';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

const AvatarPrimary = styled(Avatar)(
  ({ theme }) => `
      background: ${theme.colors.primary.lighter};
      color: ${theme.colors.primary.main};
      width: ${theme.spacing(7)};
      height: ${theme.spacing(7)};
`
);


function RecentActivity({videoLink,role,isAdmin}) {
  const theme = useTheme();

  return (
    <Card sx={{position:'fixed'}}>
      <Box px={2} py={4} display="flex" alignItems="flex-start">
        <Reactplayer url={videoLink} controls width="100%" height="200px" />
      </Box>
      <Divider />
      <Box px={2} py={4} flex={1}>
        <Typography variant="h3">This course includes</Typography>

        <Box pt={2} display="flex">
          <Box pr={8}>
            <Typography
              gutterBottom
              variant="caption"
              sx={{ fontSize: `${theme.typography.pxToRem(13)}` }}
            >
              Lectures
            </Typography>
            <Typography variant="h2">11</Typography>
          </Box>
          <Box>
            <Typography
              gutterBottom
              variant="caption"
              sx={{ fontSize: `${theme.typography.pxToRem(13)}` }}
            >
              Total Hours
            </Typography>
            <Typography variant="h2">12h 49m</Typography>
          </Box>
        </Box>
      </Box>
      <Divider />
      {role===1?
      <Box px={2} py={4} display="flex" alignItems="flex-start">
        <Button fullWidth variant="contained">Enroll</Button>
      </Box>
      : 
      !isAdmin&&
      <Box px={2} py={4} display="flex" alignItems="flex-start">
        <Button fullWidth variant="contained">Join The Community</Button>
      </Box>
      }
    </Card>
  );
}

export default RecentActivity;
