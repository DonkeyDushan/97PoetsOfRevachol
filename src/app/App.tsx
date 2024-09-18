import React from 'react';
import { StyledEngineProvider } from '@mui/material';
import { MainPage } from './pages';

import './App.css';

export const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <MainPage />
    </StyledEngineProvider>
  );
};
