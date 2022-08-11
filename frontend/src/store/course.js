import {createSlice} from '@reduxjs/toolkit';
import {apiCallBegan} from './api'

const slice=createSlice({
    name:'course',
    initialState:{
        list:[],
        current_course:null,
        search_course:[],
        loading:false,
        error:null,
        message:null
    },
    reducers:{
        courseRequest:(course,action)=>{
            course.loading=true;
        },
        createSuccess:(course,action)=>{
            course.loading=false;
            course.message="Successfully Created,Invite other in our group"
        },
        enrollSuccess:(course,action)=>{
            course.loading=false;
            course.message="Successfully enrolled the course"
        },
        searchSuccess:(course,action)=>{
            course.loading=false;
            course.search_course=action.payload;
        },
        getcourseSuccess:(course,action)=>{
            course.loading=false;
            course.current_course=action.payload;
        },
        joinSuccess:(course,action)=>{
            course.loading=false;
            course.message="Successfully Joined";
        },
        courseFail:(course,action)=>{
            course.loading=false;
            course.error=action.payload;
        },
        clearcourseError:(course,action)=>{
            course.error=null;
        },
        clearSearch:(course,action)=>{
            course.search_course=[];
        }
    }
});

export const {courseRequest,createSuccess,joinSuccess,courseFail,clearcourseError,getcourseSuccess,enrollSuccess,searchSuccess,clearSearch}=slice.actions;

export default slice.reducer;

export const createcourse=(id,data)=>(dispatch)=>{
    dispatch(apiCallBegan({
        url:`/api/community/course/${id}/create`,
        method:'post',
        data:data,
        onStart:courseRequest.type,
        onSuccess: createSuccess.type,
        onError: courseFail.type
    }));
};

export const enrollCourse=(id,data)=>(dispatch)=>{
    dispatch(apiCallBegan({
        url:`/api/community/course/${id}/enroll`,
        method:'post',
        data:data,
        onStart:courseRequest.type,
        onSuccess: enrollSuccess.type,
        onError: courseFail.type
    }));
};

export const loadCurrentcourse=(id) => (dispatch)=>{
    dispatch(apiCallBegan({
        url:`/api/community/course/${id}`,
        onStart:courseRequest.type,
        onSuccess: getcourseSuccess.type,
        onError: courseFail.type
    }));
};

export const searchCourse=(keyword)=>(dispatch)=>{

    dispatch(apiCallBegan({
        url:`/api/search/course?search=${keyword}`,
        onStart:courseRequest.type,
        onSuccess: searchSuccess.type,
        onError: courseFail.type
    }));
};

export const clearError=()=>(dispatch)=>{
    dispatch({type:clearcourseError.type});
};

export const clearCourseSearch=(dispatch)=>{
    dispatch({type:clearSearch.type});
};