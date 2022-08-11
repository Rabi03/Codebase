import { useEffect, useRef,useState } from 'react';

import { Helmet } from 'react-helmet-async';

import TopBarContent from './TopBarContent';
import BottomBarContent from './BottomBarContent';
import SidebarContent from './SidebarContent';
import ChatContent from './ChatContent';

import { Scrollbars } from 'react-custom-scrollbars-2';

import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import {useDispatch,useSelector} from 'react-redux';
import {loadchannelList} from '../../../store/channel';

const RootWrapper = styled(Box)(
  () => `
       height: 100%;
       display: flex;
`
);

const Sidebar = styled(Box)(
  ({ theme }) => `
        width: 300px;
        background: ${theme.colors.alpha.white[100]};
        border-right: ${theme.colors.alpha.black[10]} solid 1px;
`
);

const ChatWindow = styled(Box)(
  () => `
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        flex: 1;
`
);

const ChatTopBar = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.white[100]};
        border-bottom: ${theme.colors.alpha.black[10]} solid 1px;
        padding: ${theme.spacing(3)};
`
);

const ChatMain = styled(Box)(
  () => `
        flex: 1;
        overflow:scroll;
        overflow-x:hidden;
`
);

const ChatBottomBar = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(3)};
`
);

function ApplicationsMessenger() {
  const dispatch =useDispatch();
  const {list,error,loading}=useSelector(state=>state.channel);
  const ref = useRef(null);
  const [sendInfo,setSendINfo]=useState(false);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollToBottom();
    }
  });

  useEffect(() =>{
    dispatch(loadchannelList())
  },[])

  return (
    <>
      <Helmet>
        <title>Messenger - Applications</title>
      </Helmet>
      <RootWrapper>
        <Sidebar>
          <Scrollbars autoHide>
            <SidebarContent channels={list} />
          </Scrollbars>
        </Sidebar>
        <ChatWindow>
          <ChatTopBar>
            <TopBarContent />
          </ChatTopBar>
          <ChatMain>
              <ChatContent sendInfo={sendInfo} />
          </ChatMain>
          <ChatBottomBar>
            <BottomBarContent handleSendInfo={v=>setSendINfo(v)} />
          </ChatBottomBar>
        </ChatWindow>
      </RootWrapper>
    </>
  );
}

export default ApplicationsMessenger;
