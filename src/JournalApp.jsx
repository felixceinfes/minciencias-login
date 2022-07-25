import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { AppRouter } from './router/AppRouter';
import { checkLogedIn } from './store/auth';
import { AppTheme } from './theme';
export const JournalApp = () => {

  const { status } = useSelector(state=>state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLogedIn());
  }, [])
  

  return (
    <BrowserRouter basename='minciencias-login'>
      <AppTheme>
          <AppRouter/>
      </AppTheme>
    </BrowserRouter>
    /* (status==='authenticated')?
      //window.location.replace('https://google.com')
      console.log("hola")
    :<BrowserRouter basename='minciencias-login'>
      <AppTheme>
          <AppRouter/>
      </AppTheme>
    </BrowserRouter> */
  )
}
