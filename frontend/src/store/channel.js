import {createSlice} from '@reduxjs/toolkit';
import {apiCallBegan} from './api'

const slice = createSlice({
    name:'channel',
    initialState:{
        list:[],
        loading:false,
        error:null,
        currentChannel:null,
        currentChannelMembers:[]
    },
    reducers:{
        channelListRequest:(channel,action)=>{
            channel.loading=true;
        },
        channelListSuccess:(channel,action)=>{
            channel.loading=false;
            channel.list=action.payload.channel
        },
        currentChannelRequest:(channel,action)=>{
            channel.loading=false;
            channel.currentChannel=action.payload;
        },
        currentChannelMembersRequest:(channel,action)=>{
            channel.loading=false;
            channel.currentChannelMembers=action.payload.members;
        },

        channelListUpdate:(channel,action)=>{
            const findIndex=channel.list.findIndex(l=>l.channel_id===action.payload.channel_id);
            channel.list[findIndex].last_message=action.payload.message
        },
        channelListFail:(channel,action)=>{
            channel.loading=false;
            channel.error=action.payload;
        },
        clearchannelListError:(channel,action) => {
            channel.error=null
        }
    }
});

export const {channelListRequest,channelListSuccess,channelListUpdate,channelListFail,clearchannelListError,currentChannelRequest,currentChannelMembersRequest}=slice.actions;

export default slice.reducer;

export const loadchannelList =()=>(dispatch)=>{
    dispatch(apiCallBegan({
        url:'/api/channel',
        onStart:channelListRequest.type,
        onSuccess: channelListSuccess.type,
        onError: channelListFail.type
    }))
};

export const loadchannelMembers =(community_id)=>(dispatch)=>{
    dispatch(apiCallBegan({
        url:`/api/channel/${community_id}`,
        onStart:channelListRequest.type,
        onSuccess: currentChannelMembersRequest.type,
        onError: channelListFail.type
    }))
};

export const updatechannelList=(channel_id,message)=>(dispatch)=>{
    dispatch({type:channelListUpdate.type,payload:{channel_id,message}})
};

export const getCurrentChannel =(channel)=>(dispatch)=>{
    dispatch({type:currentChannelRequest.type,payload:channel})
};


export const clearError=()=>(dispatch)=>{
    dispatch({type:clearchannelListError.type});
}