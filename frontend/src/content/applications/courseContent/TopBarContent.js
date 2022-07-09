import { useState } from 'react';
import {
  Box,
  IconButton,
  Tooltip,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  Drawer,
  Divider,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Rating,
  ListItemIcon,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button
} from '@mui/material';

import { styled } from '@mui/material/styles';
import CommentIcon from '@mui/icons-material/Comment';
import AddCommentIcon from '@mui/icons-material/AddComment';

const RootWrapper = styled(Box)(
  ({ theme }) => `
        @media (min-width: ${theme.breakpoints.values.md}px) {
          display: flex;
          align-items: center;
          justify-content: space-between;
      }
`
);

const ListItemIconWrapper = styled(ListItemIcon)(
  ({ theme }) => `
        min-width: 36px;
        color: ${theme.colors.primary.light};
`
);

const AccordionSummaryWrapper = styled(AccordionSummary)(
  ({ theme }) => `
        &.Mui-expanded {
          min-height: 48px;
        }

        .MuiAccordionSummary-content.Mui-expanded {
          margin: 12px 0;
        }

        .MuiSvgIcon-root {
          transition: ${theme.transitions.create(['color'])};
        }

        &.MuiButtonBase-root {

          margin-bottom: ${theme.spacing(0.5)};

          &:last-child {
            margin-bottom: 0;
          }

          &.Mui-expanded,
          &:hover {
            background: ${theme.colors.alpha.black[10]};

            .MuiSvgIcon-root {
              color: ${theme.colors.primary.main};
            }
          }
        }
`
);

function TopBarContent() {

  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [expanded, setExpanded] = useState('section1');

  const handleChange = (section) => (event, isExpanded) => {
    setExpanded(isExpanded ? section : false);
  };

  return (
    <>
      <RootWrapper>
        <Box sx={{ display: { sm: 'flex' } }} alignItems="center">
          <Avatar
            variant="rounded"
            sx={{ width: 50, height: 50 }}
            alt="Zain Baptista"
            src="https://media.nature.com/lw800/magazine-assets/d41586-019-00653-5/d41586-019-00653-5_16459152.jpg"
          />
          <Box sx={{ pl: { sm: 1.5 }, pt: { xs: 1.5, sm: 0 } }}>
            <Typography variant="h4" gutterBottom>
              The Complete JavaScript Course 2022: From Zero to Expert!
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            mt: { xs: 3, md: 0 }
          }}
        >
          <Tooltip placement="bottom" title="Comment">
            <IconButton color="primary" onClick={handleDrawerToggle}>
              <CommentIcon />
            </IconButton>
          </Tooltip>

        </Box>
      </RootWrapper>
      <Drawer
        variant="temporary"
        anchor={theme.direction === 'rtl' ? 'left' : 'right'}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        elevation={9}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px' }}>
          <Typography variant="h4">Comments</Typography>
          <Tooltip placement="top" title="Add Comment">
            <IconButton color="primary" onClick={handleClickOpen}>
              <AddCommentIcon />
            </IconButton>
          </Tooltip>

        </Box>


        <Box sx={{ minWidth: 360 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ backgroundColor: 'red' }} aria-label="recipe">
                R
              </Avatar>
            }
            title="Shrimp and Chorizo Paella"
            subheader={<Rating name="size-small" size="small" value={4} readOnly />}
          />
          <CardContent>
            <Typography variant="h5" color="text.primary" sx={{ marginLeft: '50px', marginTop: '-30px' }}>
              This is a nice course.
            </Typography>
          </CardContent>
        </Box>
        <Box sx={{ minWidth: 360 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ backgroundColor: 'red' }} aria-label="recipe">
                A
              </Avatar>
            }
            title="Shrimp and Chorizo Paella"
            subheader={<Rating name="size-small" size="small" value={4} readOnly />}
          />
          <CardContent>
            <Typography variant="h5" color="text.primary" sx={{ marginLeft: '50px', marginTop: '-30px' }}>
              This is a nice course.
            </Typography>
          </CardContent>
        </Box>
      </Drawer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Your Comment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Rating
              name="half-rating"
              value={rating}
              precision={0.5}
              onChange={(event, newValue) => {
                setRating(newValue);
              }} />
          </DialogContentText>
          <TextField
            autoFocus
            multiline
            margin="dense"
            id="name"
            label="Tell us about your personal experience taking this course."
            type="text"
            fullWidth
            variant="standard"
            sx={{width:'500px'}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Comment</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TopBarContent;
