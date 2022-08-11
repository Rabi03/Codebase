import { createSlice } from '@reduxjs/toolkit';
import {apiCallBegan} from './api';

const slice = createSlice({
    name: 'message',
    initialState: {
        list: [],
        currentChatUser: null,
        currentChat:null,
        loading: false,
        sending: 0,
        error: null
    },
    reducers: {
        messageRequest: (message, action) => {
            message.loading = true;
        },
        messageSuccess: (message, action) => {
            message.loading = false;
            message.list = action.payload.messages;
        },
        currentChatUserUpdate: (message, action) => {
            message.currentChatUser=action.payload;
        },
        updateCurrentChatId:(message,action)=>{
            message.currentChat=action.payload;
        },
        updateMessageList:(message, action)=>{
            message.list.push(action.payload);
        },
        addMessageRequest: (message, action) => {
            message.sending = 1
        },
        addMessageSuccess: (message, action) => {
            message.sending = 0
        },
        addMessageFail: (message, action) => {
            message.sending = 2;
            message.error = action.payload;
        },
        clearMessageError:(message,action) => {
            message.error=null
        }
    }
});

export const { messageRequest, messageSuccess, addMessageRequest, addMessageSuccess, addMessageFail,currentChatUserUpdate,clearMessageError,updateCurrentChatId,updateMessageList } = slice.actions;

export default slice.reducer;


export const getMessages=(community_id,channel_id,chat)=>(dispatch)=>{
    dispatch(apiCallBegan({
        url:`/api/message/${community_id}/${channel_id}`,
        onStart:messageRequest.type,
        onSuccess: messageSuccess.type,
        onError: addMessageFail.type
    }));

    dispatch({type:updateCurrentChatId.type,payload:chat});
};

export const updateCurrentChatUser=(user)=>(dispatch)=>{
    dispatch({type:currentChatUserUpdate.type,payload:user})
};

export const addMessage=(content,channel_id)=>(dispatch)=>{
    dispatch(apiCallBegan({
        url:`/api/message/${channel_id}/send`,
        method:'post',
        data:content,
        onStart:addMessageRequest.type,
        onSuccess: addMessageSuccess.type,
        onError: addMessageFail.type
    }))
};

export const messageListUpdate=(content)=>(dispatch)=>{
    dispatch({type:updateMessageList.type,payload:content})
};

export const clearError=()=>(dispatch)=>{
    dispatch({type:clearMessageError.type});
}