import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';

import { RouteComponent } from './route';
import { SessionIdProvider } from './contexts/SessionIdContext';

import './App.css'; // App.css is a "global module"

const theme = createTheme({
  typography: {
    fontFamily: 'Pretendard-Regular',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SessionIdProvider>
        <BrowserRouter>
          <RouteComponent />
        </BrowserRouter>
      </SessionIdProvider>
    </ThemeProvider>
  );
}

export default App;
