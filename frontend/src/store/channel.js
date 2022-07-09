import {createSlice} from '@reduxjs/toolkit';
import {apiCallBegan} from './api'

const slice = createSlice({
    name:'channel',
    initialState:{
        list:[],
        loading:false,
        error:null
    },
    reducers:{
        channelListRequest:(channel,action)=>{
            channel.loading=true;
        },
        channelListSuccess:(channel,action)=>{
            channel.loading=false;
            channel.list=action.payload.channels
        },
        channelListUpdate:(channel,action)=>{
            const findIndex=channel.list.findIndex(l=>l._id===action.payload._id);
            if(findIndex>-1){
                channel.list.splice(findIndex,1);
                channel.list.unshift(action.payload);
            }
            else{
                channel.list.unshift(action.payload);
            }
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

export const {channelListRequest,channelListSuccess,channelListUpdate,channelListFail,clearchannelListError}=slice.actions;

export default slice.reducer;

export const loadchannelList =()=>(dispatch)=>{
    dispatch(apiCallBegan({
        url:'/api/channel',
        onStart:channelListRequest.type,
        onSuccess: channelListSuccess.type,
        onError: channelListFail.type
    }))
};

export const updatechannelList=(channel)=>(dispatch)=>{
    dispatch({type:channelListUpdate.type,payload:channel})
};


export const clearError=()=>(dispatch)=>{
    dispatch({type:clearchannelListError.type});
}