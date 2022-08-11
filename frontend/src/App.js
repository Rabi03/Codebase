import { useRoutes } from 'react-router-dom';
import routes from './router';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, clearError } from './store/auth'

import ThemeProvider from './theme/ThemeProvider';
import { CssBaseline } from '@mui/material';
import './App.css'
import { useEffect,useState } from 'react';
import swal from 'sweetalert';
import { RootContext } from './contexts/RootContext';
import {io} from 'socket.io-client';

var socket;
const ENDPOINT = 'http://localhost:5000';

const App = () => {
  const dispatch = useDispatch();
  const content = useRoutes(routes);
  const [userActive,setActive]= useState(false);
  const { user,error } = useSelector(state => state.auth)
  useEffect(() => {
    if (error) {
      swal("Server error", error, "error");
      dispatch(clearError());
    }
  })

  useEffect(()=>{
    if(user){
    socket=io(ENDPOINT);
    socket.emit('setup',user.user);
    socket.on('connected',()=>{
      setActive(true);
      swal("Codebase","Welcome Back"+user.user.name,'info')
    });
  }
  },[user]);


  useEffect(() => {

    dispatch(loadUser());
  }, [])

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <RootContext.Provider value={{socket}}>

          {content}
        </RootContext.Provider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
export default App;
