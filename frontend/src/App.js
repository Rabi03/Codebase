import { useRoutes } from 'react-router-dom';
import routes from './router';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {useDispatch,useSelector} from 'react-redux';
import {loadUser,clearError} from './store/auth'

import ThemeProvider from './theme/ThemeProvider';
import { CssBaseline } from '@mui/material';
import './App.css'
import { useEffect } from 'react';
import swal from 'sweetalert';

const App = () => {
  const dispatch = useDispatch();
  const content = useRoutes(routes);
  const {error}=useSelector(state=>state.auth)
  useEffect(()=>{
    if(error) {
      swal("Server error", error, "error");
      dispatch(clearError());
    }
  })
  

  useEffect(() =>{
    
    dispatch(loadUser());
  },[])

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {content}
      </LocalizationProvider>
    </ThemeProvider>
  );
}
export default App;
