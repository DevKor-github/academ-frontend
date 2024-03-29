import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';

import { RouteComponent } from './route';
import { Layout } from './components/Layout';

import './App.css';

const theme = createTheme({
  typography: {
    fontFamily: 'Pretendard-Regular',
  },
});

/**
 * BrowserRouter : 브라우저의 주소를 관리하는 Provider
 * Layout : 페이지의 레이아웃을 담당하는 컴포넌트입니다
 * RouteComponent : 페이지의 라우팅을 담당하는 컴포넌트
 */
function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <RouteComponent />
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
