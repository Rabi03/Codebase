import {
  Card,
  Avatar,
  Tooltip,
  IconButton,
  Box,
  Button,
  Hidden,
  TextField,
  Divider
} from '@mui/material';

import { styled } from '@mui/material/styles';
import AttachFileTwoToneIcon from '@mui/icons-material/AttachFileTwoTone';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import Picker from 'emoji-picker-react';
import { useState,useContext } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {addMessage,messageListUpdate} from '../../../store/message';
import {updatechannelList} from '../../../store/channel';
import { RootContext } from 'src/contexts/RootContext';

const DividerWrapper = styled(Divider)(
  ({ theme }) => `
        height: 40px !important;
        margin: 0 ${theme.spacing(2)};
        align-self: center;
`
);

const Input = styled('input')({
  display: 'none'
});

function BottomBarContent({handleSendInfo}) {
  const {socket}=useContext(RootContext);
  const dispatch =useDispatch();
  const [message, setMessage] = useState('')
  const [openEmoji, setOpenEmoji] = useState(false);
  const {user}=useSelector(state=>state.auth);
  const {currentChannel,currentChannelMembers}=useSelector(state=>state.channel);

  const onEmojiClick = (event, emojiObject) => {
    setMessage(msg=>msg+emojiObject.emoji);
  };

  const handleSubmit = e=>{
    handleSendInfo(true)
    dispatch(
      addMessage(
        {
          channel_id:currentChannel.channel_id,
          type:'text',
          message,
          sender_id:user.user.user_id
        },currentChannel.channel_id));
        dispatch(messageListUpdate({
          channel_id:currentChannel.channel_id,
          type:'text',
          message,
          sender_id:user.user.user_id,
          members:currentChannelMembers,
          timestamp:Date.now()
        }));

        dispatch(updatechannelList(currentChannel.channel_id,message))

        socket.emit('new message',{
          channel_id:currentChannel.channel_id,
          type:'text',
          sender_id: user.user.user_id,
          members:currentChannelMembers,
          message: message,
          timestamp: Date.now(),
        })
        handleSendInfo(false)
    
        setMessage("")
  };

  return (
    <>
      {openEmoji && <Picker onEmojiClick={onEmojiClick} disableSearchBar={true} pickerStyle={{ position: 'absolute',marginTop:'-300px',right:0 }} />}

      <Card sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
        <Box sx={{ flex: 1, mr: 2 }}>
          <TextField
            hiddenLabel
            fullWidth
            placeholder="Write here your message..."
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
        </Box>
        <Tooltip arrow placement="top" title="Choose an emoji" onClick={() => setOpenEmoji(!openEmoji)}>
          <IconButton color="primary">😀</IconButton>
        </Tooltip>

        <Input accept="image/*" id="messenger-upload-file" type="file" />
        <Tooltip arrow placement="top" title="Attach a file">
          < label htmlFor="messenger-upload-file" >
            <IconButton color="primary" component="span">
              <AttachFileTwoToneIcon />
            </IconButton>
          </label >
        </Tooltip >
        <Hidden mdDown>
          <DividerWrapper orientation="vertical" flexItem />
          <Button startIcon={<SendTwoToneIcon />} variant="contained" onClick={handleSubmit}>
            Send
          </Button>
        </Hidden>
      </Card>
    </>
  );
}

export default BottomBarContent;
