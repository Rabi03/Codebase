import { useState } from 'react';
import {
  Box,
  Typography,
  FormControlLabel,
  Switch,
  Tabs,
  Tab,
  TextField,
  IconButton,
  InputAdornment,
  Avatar,
  List,
  Button,
  Tooltip,
  Divider,
  AvatarGroup,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  lighten
} from '@mui/material';

import { styled } from '@mui/material/styles';
import { formatDistance, subMinutes, subHours } from 'date-fns';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import Label from 'src/components/Label';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import AlarmTwoToneIcon from '@mui/icons-material/AlarmTwoTone';
import { Link as RouterLink ,useParams,useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {getCurrentChannel,loadchannelMembers} from '../../../store/channel';
import { useContext } from 'react';
import { RootContext } from 'src/contexts/RootContext';

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
          background-color: ${theme.colors.success.lighter};
          color: ${theme.colors.success.main};
          width: ${theme.spacing(8)};
          height: ${theme.spacing(8)};
          margin-left: auto;
          margin-right: auto;
    `
);

const MeetingBox = styled(Box)(
  ({ theme }) => `
          background-color: ${lighten(theme.colors.alpha.black[10], 0.5)};
          margin: ${theme.spacing(2)} 0;
          border-radius: ${theme.general.borderRadius};
          padding: ${theme.spacing(2)};
    `
);

const RootWrapper = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(2.5)};
  `
);

const ListItemWrapper = styled(ListItemButton)(
  ({ theme }) => `
        &.MuiButtonBase-root {
            margin: ${theme.spacing(1)} 0;
        }
  `
);

const TabsContainerWrapper = styled(Box)(
  ({ theme }) => `
        .MuiTabs-indicator {
            min-height: 4px;
            height: 4px;
            box-shadow: none;
            border: 0;
        }

        .MuiTab-root {
            &.MuiButtonBase-root {
                padding: 0;
                margin-right: ${theme.spacing(3)};
                font-size: ${theme.typography.pxToRem(16)};
                color: ${theme.colors.alpha.black[50]};

                .MuiTouchRipple-root {
                    display: none;
                }
            }

            &.Mui-selected:hover,
            &.Mui-selected {
                color: ${theme.colors.alpha.black[100]};
            }
        }
  `
);

function SidebarContent({channels}) {
  const dispatch =useDispatch();
  const {community_id,channel_id}=useParams();
  const navigate=useNavigate()
  const {socket}=useContext(RootContext);

  const user =
  {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg',
    jobtitle: 'Software Developer'
  };

  const [state, setState] = useState({
    invisible: true
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked
    });
  };

  const [currentTab, setCurrentTab] = useState('all');

  const tabs = [
    { value: 'all', label: 'All' },
    { value: 'unread', label: 'Unread' },
    { value: 'archived', label: 'Archived' }
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const handleChannel=(channel)=>{
    navigate(`/home/messenger/${channel.community_id}/${channel.channel_id}`);
    dispatch(getCurrentChannel(channel));
    dispatch(loadchannelMembers(channel.community_id))
    socket.emit('join chat',channel.channel_id);
  };

  return (
    <RootWrapper>
      <Typography sx={{ mb: 1, mt: 2 }} variant="h3">
        Chats
      </Typography>

      <Box mt={2}>
          <List disablePadding component="div">
            {channels.map(channel =>
            <ListItemWrapper selected={channel.community_id===community_id} onClick={()=>handleChannel(channel)}>
              <ListItemAvatar>
                <Avatar src={channel.group_image} />
              </ListItemAvatar>
              <ListItemText
                sx={{ mr: 1 }}
                primaryTypographyProps={{
                  color: 'textPrimary',
                  variant: 'h5',
                  noWrap: true
                }}
                secondaryTypographyProps={{
                  color: 'textSecondary',
                  noWrap: true
                }}
                primary={channel.name}
                secondary={channel.last_message}
              />
              <Label color="primary">
                <b>2</b>
              </Label>
            </ListItemWrapper>
            )}
          </List>
      </Box>
      <Box display="flex" pb={1} mt={4} alignItems="center">
        <Typography sx={{ mr: 1 }} variant="h3">
          Meetings
        </Typography>
        <Label color="success">
          <b>2</b>
        </Label>
      </Box>
      <MeetingBox>
        <Typography variant="h4">Daily Design Meeting</Typography>

        <Box py={3} display="flex" alignItems="flex-start">
          <AlarmTwoToneIcon />
          <Box pl={1}>
            <Typography
              variant="subtitle2"
              sx={{ lineHeight: 1 }}
              color="text.primary"
            >
              10:00 - 11:30
            </Typography>
            <Typography variant="subtitle1">
              {formatDistance(subMinutes(new Date(), 12), new Date(), {
                addSuffix: true
              })}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <AvatarGroup>
            <Tooltip arrow title="View profile for Remy Sharp">
              <Avatar
                sx={{ width: 28, height: 28 }}
                component={RouterLink}
                to="#"
                alt="Remy Sharp"
                src="/static/images/avatars/1.jpg"
              />
            </Tooltip>
            <Tooltip arrow title="View profile for Travis Howard">
              <Avatar
                sx={{ width: 28, height: 28 }}
                component={RouterLink}
                to="#"
                alt="Travis Howard"
                src="/static/images/avatars/2.jpg"
              />
            </Tooltip>
            <Tooltip arrow title="View profile for Craig Vaccaro">
              <Avatar
                sx={{ width: 28, height: 28 }}
                component={RouterLink}
                to="#"
                alt="Craig Vaccaro"
                src="/static/images/avatars/1.jpg"
              />
            </Tooltip>
          </AvatarGroup>

          <Button variant="contained" size="small">
            Attend
          </Button>
        </Box>
      </MeetingBox>

      <MeetingBox>
        <Typography variant="h4">Investors Council Meeting</Typography>

        <Box py={3} display="flex" alignItems="flex-start">
          <AlarmTwoToneIcon />
          <Box pl={1}>
            <Typography
              variant="subtitle2"
              sx={{ lineHeight: 1 }}
              color="text.primary"
            >
              14:30 - 16:15
            </Typography>
            <Typography variant="subtitle1">
              {formatDistance(subHours(new Date(), 4), new Date(), {
                addSuffix: true
              })}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <AvatarGroup>
            <Tooltip arrow title="View profile for Travis Howard">
              <Avatar
                sx={{ width: 28, height: 28 }}
                component={RouterLink}
                to="#"
                alt="Travis Howard"
                src="/static/images/avatars/4.jpg"
              />
            </Tooltip>
            <Tooltip arrow title="View profile for Craig Vaccaro">
              <Avatar
                sx={{ width: 28, height: 28 }}
                component={RouterLink}
                to="#"
                alt="Craig Vaccaro"
                src="/static/images/avatars/5.jpg"
              />
            </Tooltip>
          </AvatarGroup>

          <Button variant="contained" size="small">
            Attend
          </Button>
        </Box>
      </MeetingBox>
    </RootWrapper>
  );
}

export default SidebarContent;
