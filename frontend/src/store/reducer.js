import {combineReducers} from '@reduxjs/toolkit';
import channelReducer from './channel';
import authReducer from './auth';
import messageReducer from './message';
import homeReducer from './home';
import communityReducer from './community';
import courseReducer from './course';

export default combineReducers({
    auth: authReducer,
    channel: channelReducer,
    message: messageReducer,
    home: homeReducer,
    community:communityReducer,
    course: courseReducer
})