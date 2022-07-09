import { forwardRef, useState } from 'react';
import {
  Avatar,
  Link,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  lighten,
  List,
  ListItem,
  ListItemAvatar,
  TextField,
  Tooltip,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Hidden,
  Select,
  MenuItem,
  OutlinedInput
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import FindInPageTwoToneIcon from '@mui/icons-material/FindInPageTwoTone';

import ChevronRightTwoToneIcon from '@mui/icons-material/ChevronRightTwoTone';

import { useDispatch, useSelector } from 'react-redux';
import { searchCourse,clearCourseSearch } from '../../../../store/course';
import { searchCommunity,clearCommunitySearch } from '../../../../store/community';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const DialogWrapper = styled(Dialog)(
  () => `
    .MuiDialog-container {
        height: auto;
    }
    
    .MuiDialog-paperScrollPaper {
        max-height: calc(100vh - 64px)
    }
`
);

const SearchInputWrapper = styled(TextField)(
  ({ theme }) => `
    background: ${theme.colors.alpha.white[100]};

    .MuiInputBase-input {
        font-size: ${theme.typography.pxToRem(17)};
    }
`
);

const DialogTitleWrapper = styled(DialogTitle)(
  ({ theme }) => `
    background: ${theme.colors.alpha.black[5]};
    padding: ${theme.spacing(3)}
`
);

function HeaderSearch() {

  const dispatch = useDispatch();
  const { search_course } = useSelector(state => state.course);
  const { search_community } = useSelector(state => state.community);
  const [openSearchResults, setOpenSearchResults] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [search, setSearch] = useState(1);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value)
    if (event.target.value) {
      if (!openSearchResults) {
        setOpenSearchResults(true);
      }
    } else {
      setOpenSearchResults(false);
    }

    console.log(search)
    if (search === 1) {

      dispatch(searchCourse(event.target.value));
    }
    else {
      dispatch(searchCommunity(event.target.value));
    }
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange = (e)=>{
    setSearch(e.target.value);
    setSearchValue("");
    setOpenSearchResults(false);
    dispatch(clearCommunitySearch);
    dispatch(clearCourseSearch);
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip arrow title="Search">
        <IconButton color="primary" onClick={handleClickOpen}>
          <SearchTwoToneIcon />
        </IconButton>
      </Tooltip>


      <DialogWrapper
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="md"
        fullWidth
        scroll="paper"
        onClose={handleClose}
      >
        <DialogTitleWrapper>
          <SearchInputWrapper
            value={searchValue}
            autoFocus={true}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchTwoToneIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end" sx={{marginRight:'0px'}}>
                  <Select
                  className='search-all'
                  value={search}
                  onChange={handleChange}
                >
                  <MenuItem value={1}>Course</MenuItem>
                  <MenuItem value={2}>Community</MenuItem>
                </Select>
                </InputAdornment>
                )
            }}
            placeholder="Search terms here..."
            fullWidth
            label="Search"
          />

        </DialogTitleWrapper>
        <Divider />

        {(search_course.length > 0 || search_community.length > 0) && (
          <DialogContent>
            <Box
              sx={{ pt: 0, pb: 1 }}
              display="flex"
              justifyContent="space-between"
            >
              <Typography variant="body2" component="span">
                Search results for{' '}
                <Typography
                  sx={{ fontWeight: 'bold' }}
                  variant="body1"
                  component="span"
                >
                  {searchValue}
                </Typography>
              </Typography>
              <Link href="#" variant="body2" underline="hover">
                Advanced search
              </Link>
            </Box>
            <Divider sx={{ my: 1 }} />
            <List disablePadding>
              {search_course.length > 0 &&
                search_course.map(course =>
                  <>
                    <ListItem button>
                      <Hidden smDown>
                        <ListItemAvatar>
                          <Avatar
                            src={course.image}
                          />
                        </ListItemAvatar>
                      </Hidden>
                      <Box flex="1">
                        <Box display="flex" justifyContent="space-between">
                          <Link href={`/home/course/${course.course_id}`} underline="hover" sx={{ fontWeight: 'bold' }} variant="body2">
                            {course.name}
                          </Link>
                        </Box>
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{
                            color: (theme: Theme) =>
                              lighten(theme.palette.secondary.main, 0.5)
                          }}
                        >
                          {course.description.substr(0, 100) + '....'}
                        </Typography>
                      </Box>
                      <ChevronRightTwoToneIcon />
                    </ListItem>
                    <Divider sx={{ my: 1 }} component="li" />
                  </>
                )}
              {search_community.length > 0 &&
                search_community.map(community =>
                  <>
                    <ListItem button>
                      <Hidden smDown>
                        <ListItemAvatar>
                          <Avatar
                            src={community.group_image}
                          />
                        </ListItemAvatar>
                      </Hidden>
                      <Box flex="1">
                        <Box display="flex" justifyContent="space-between">
                          <Link href="#" underline="hover" sx={{ fontWeight: 'bold' }} variant="body2">
                            {community.name}
                          </Link>
                        </Box>
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{
                            color: (theme: Theme) =>
                              lighten(theme.palette.secondary.main, 0.5)
                          }}
                        >
                          {community.purpose}
                        </Typography>
                      </Box>
                      <ChevronRightTwoToneIcon />
                    </ListItem>
                    <Divider sx={{ my: 1 }} component="li" />
                  </>
                )}
            </List>
            <Divider sx={{ mt: 1, mb: 2 }} />
            <Box sx={{ textAlign: 'center' }}>
              <Button color="primary">View all search results</Button>
            </Box>
          </DialogContent>
        )}
      </DialogWrapper>
    </>
  );
}

export default HeaderSearch;
