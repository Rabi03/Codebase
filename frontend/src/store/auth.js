import {createSlice} from '@reduxjs/toolkit';
import {apiCallBegan} from './api';

const slice = createSlice({
    name:'auth',
    initialState:{
        loading: false,
        isAuthenticated:false,
        user:null,
        error:null
    },
    reducers:{
        authRequest:(auth,action) => {
            auth.loading=true;
        },
        authSuccess:(auth,action) => {
            auth.loading=false;
            auth.isAuthenticated=true;
            auth.user=action.payload
        },
        authFail:(auth,action) => {
            auth.loading=false;
            auth.isAuthenticated=false;
            auth.user=null;
            auth.error=action.payload;
        },
        logoutSuccess:(auth,action) => {
            auth.loading=false;
            auth.isAuthenticated=false;
            auth.user=null;
            auth.error=null;
        },
        clearAuthError:(auth,action) => {
            auth.error=null
        }
    }
});

export const {authRequest,authSuccess,authFail,logoutSuccess,clearAuthError} =slice.actions;
export default slice.reducer;


export const loginUser=(email,password) =>(dispatch)=>{
    dispatch(apiCallBegan({
        url:'/api/user/login',
        method: 'post',
        data:{email,password},
        onStart:authRequest.type,
        onSuccess: authSuccess.type,
        onError: authFail.type
    }));
    
}
export const registerUser=(data) =>(dispatch)=>{
    dispatch(apiCallBegan({
        url:'/api/user/register',
        method: 'post',
        data,
        onStart:authRequest.type,
        onSuccess: authSuccess.type,
        onError: authFail.type
    }));
};

export const logoutUser=()=>(dispatch)=>{
    dispatch(apiCallBegan({
        url:'/api/user/logout',
        onStart:authRequest.type,
        onSuccess: logoutSuccess.type,
        onError: authFail.type
    }));
}

export const clearError=()=>(dispatch)=>{
    dispatch({type:clearAuthError.type});
}

export const loadUser=()=>(dispatch)=>{
    dispatch(apiCallBegan({
        url:"/api/user/me",
        onStart:authRequest.type,
        onSuccess: authSuccess.type,
        onError: authFail.type
    }));
}