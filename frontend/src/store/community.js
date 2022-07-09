import {createSlice} from '@reduxjs/toolkit';
import {apiCallBegan} from './api'

const slice=createSlice({
    name:'community',
    initialState:{
        list:[],
        current_community:null,
        search_community:[],
        loading:false,
        error:null,
        message:null
    },
    reducers:{
        communityRequest:(community,action)=>{
            community.loading=true;
        },
        createSuccess:(community,action)=>{
            community.loading=false;
            community.message="Successfully Created,Invite other in our group"
        },
        searchSuccess:(community,action)=>{
            community.loading=false;
            community.search_community=action.payload;
        },
        getCommunitySuccess:(community,action)=>{
            community.loading=false;
            community.current_community=action.payload;
        },
        joinSuccess:(community,action)=>{
            community.loading=false;
            community.message="Successfully Joined";
        },
        communityFail:(community,action)=>{
            community.loading=false;
            community.error=action.payload;
        },
        clearCommunityError:(community,action)=>{
            community.error=null;
        },
        clearSearch:(community,action)=>{
            community.search_community=[];
        }
    }
});

export const {communityRequest,createSuccess,joinSuccess,communityFail,clearCommunityError,getCommunitySuccess,searchSuccess,clearSearch}=slice.actions;

export default slice.reducer;

export const createCommunity=(data)=>(dispatch)=>{
    dispatch(apiCallBegan({
        url:'/api/community/create',
        method:'post',
        data:data,
        onStart:communityRequest.type,
        onSuccess: createSuccess.type,
        onError: communityFail.type
    }));
};

export const loadCurrentCommunity=(id) => (dispatch)=>{
    dispatch(apiCallBegan({
        url:`/api/community/${id}`,
        onStart:communityRequest.type,
        onSuccess: getCommunitySuccess.type,
        onError: communityFail.type
    }));
};

export const searchCommunity=(keyword)=>(dispatch)=>{
    dispatch(apiCallBegan({
        url:`/api/search/community?search=${keyword}`,
        onStart:communityRequest.type,
        onSuccess: searchSuccess.type,
        onError: communityFail.type
    }));
};

export const clearError=()=>(dispatch)=>{
    dispatch({type:clearCommunityError.type});
};

export const clearCommunitySearch=(dispatch)=>{
    dispatch({type:clearSearch.type});
};