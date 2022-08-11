import React,{useEffect,useRef} from 'react';
import { Box, Avatar, Typography, Card, Divider } from '@mui/material';

import { styled } from '@mui/material/styles';
import {
  formatDistance,
  format,
  subDays,
  subHours,
  subMinutes
} from 'date-fns';
import ScheduleTwoToneIcon from '@mui/icons-material/ScheduleTwoTone';
import { useDispatch,useSelector } from 'react-redux';
import {getMessages} from '../../../store/message';
import {useParams} from 'react-router-dom';

const DividerWrapper = styled(Divider)(
  ({ theme }) => `
      .MuiDivider-wrapper {
        text-transform: none;
        background: ${theme.palette.background.default};
        font-size: ${theme.typography.pxToRem(13)};
        color: ${theme.colors.alpha.black[50]};
      }
`
);

const CardWrapperPrimary = styled(Card)(
  ({ theme }) => `
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      padding: ${theme.spacing(2)};
      border-radius: ${theme.general.borderRadiusXl};
      border-top-right-radius: ${theme.general.borderRadius};
      max-width: 380px;
      display: inline-flex;
`
);

const CardWrapperSecondary = styled(Card)(
  ({ theme }) => `
      background: ${theme.colors.alpha.black[10]};
      color: ${theme.colors.alpha.black[100]};
      padding: ${theme.spacing(2)};
      border-radius: ${theme.general.borderRadiusXl};
      border-top-left-radius: ${theme.general.borderRadius};
      max-width: 380px;
      display: inline-flex;
`
);

function ChatContent({sendInfo}) {
  const {community_id,channel_id}=useParams();
  const dispatch =useDispatch();
  const {list,loading,error,sending}=useSelector(state=>state.message);
  const {user}=useSelector(state=>state.auth);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(()=>{
    
    scrollToBottom();
  });
  

  useEffect(() => {
    dispatch(getMessages(community_id,channel_id));
  },[community_id,channel_id])

  if(loading) return <div>Loading..........</div>
  else return (
    <Box p={3} sx={{overflow: "hidden"}}>
      {list.map((message,index)=>
      <Box
        display="flex"
        alignItems="flex-start"
        justifyContent={message.sender_id===user.user.user_id?"flex-end":'flex-start'}
        py={1}
      >
        {message.sender_id!==user.user.user_id&&
        <Avatar
          variant="rounded"
          sx={{ width: 50, height: 50 }}
          alt="Zain Baptista"
          src={message.image}
        />
        }
        <Box
          display="flex"
          alignItems={message.sender_id===user.user.user_id?"flex-end":'flex-start'}
          flexDirection="column"
          justifyContent={message.sender_id===user.user.user_id?"flex-end":'flex-start'}
          ml={message.sender_id!==user.user.user_id&&(index>0&&list[index-1].sender_id===message.sender_id)?3:2}
          mr={message.sender_id===user.user.user_id&&(index>0&&list[index-1].sender_id===message.sender_id)?3:2}
        >
          {message.sender_id===user.user.user_id?
          <CardWrapperPrimary>
            {message.message}
          </CardWrapperPrimary>
          :
          <CardWrapperSecondary>
            {message.message}
          </CardWrapperSecondary>
          }
          <Typography
            variant="subtitle1"
            sx={{ pt: 1, display: 'flex', alignItems: 'center' }}
          >
            <ScheduleTwoToneIcon sx={{ mr: 0.5 }} fontSize="small" />
            {formatDistance(subHours(new Date(), 115), new Date(), {
              addSuffix: true
            })}
          </Typography>
        </Box>
        {message.sender_id===user.user.user_id&&
        <Avatar
        variant="rounded"
        alt="Zain Baptista"
        src={message.image}
        sx={{display:(index>0&&list[index-1].sender_id===message.sender_id)?'none':'',width: 50, height: 50}}
      />
        }
      </Box>
      )}
      {sendInfo&&<span style={{display:'flex',justifyContent: 'flex-end',marginRight:'20px',marginTop:'-20px',fontWeight:'bold',color:'green',animationDelay: `0.1s`}}>{sending==1?'Sending':sending==2?'Failed to sent':"Sent"}</span>}

      <div ref={messagesEndRef} style={{overflow: 'hidden'}} />
    </Box>
  );
}

export default ChatContent;
