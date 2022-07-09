import {createSlice} from '@reduxjs/toolkit';
import {apiCallBegan} from './api';

const slice=createSlice({
    name:'home',
    initialState:{
        loading:false,
        topCommunity:null,
        promotion:null,
        error:null
    },
    reducers:{
        homeRequest:(home,action) => {
            home.loading=true;
        },
        fetchPromotions:(home,action) => {
            home.loading=false;
            home.promotion=action.payload.promotion;
        },
        fetchTopCommunity:(home,action) => {
            home.loading=false;
            home.topCommunity=action.payload.topCommunity;
        },
        homeFail:(home,action) =>{
            home.loading=false;
            home.error=action.payload;
        }
    }
});

export const {homeRequest,fetchPromotions,fetchTopCommunity,homeFail}=slice.actions;

export default slice.reducer;

export const getPromotion = (dispatch)=>{
    dispatch(apiCallBegan({
        url:'/api/promotion',
        onStart:homeRequest.type,
        onSuccess:fetchPromotions.type,
        onError:homeFail.type
    }))
};
export const getTopCommunity =(skip)=> (dispatch)=>{
    dispatch(apiCallBegan({
        url:`/api/community/topCommunity?skip=${skip}`,
        onStart:homeRequest.type,
        onSuccess:fetchTopCommunity.type,
        onError:homeFail.type
    }))
};