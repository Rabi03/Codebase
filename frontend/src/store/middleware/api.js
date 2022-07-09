import axios from 'axios';
import * as actions from '../api';

const api=({dispatch})=>next=>async action=>{
    if(action.type!==actions.apiCallBegan.type) return next(action);

    const {url,method,data,onSuccess,onStart,onError}=action.payload;
    if(onStart)
    dispatch({type:onStart});
    next(action);
    try {
        const headers={
            'Content-Type': 'application/json'
        }
        const response=await axios.request({
            url,
            method,
            headers,
            data
        });
        dispatch(actions.apiCallSuccess(response.data));
        if(onSuccess)
        dispatch({type:onSuccess, payload:response.data});
        
    } catch (error) {
        console.log(error)
        dispatch(actions.apiCallFail(error.response.data.error?error.response.data.error.message:error.message))
        if(onError)
        dispatch({type:onError, payload:error.response.data.error?error.response.data.error.message:error.message});
    }

};

export default api;