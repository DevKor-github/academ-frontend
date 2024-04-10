import { Route, Routes, Outlet } from 'react-router-dom';

import { UserMyPage } from '../pages/UserMy';
import { TimetablePage } from '../pages/Timetable';
import { SearchPage } from '../pages/Search';
import { RegisterPage } from '../pages/Register';
import { MainPage } from '../pages/Main';
import { LogoutPage } from '../pages/Logout';
import { LoginPage } from '../pages/Login';
import { ErrorPage } from '../pages/Error';
import { CurationPage } from '../pages/Curation';
import { Layout, Modallike } from '../components';

export function RouteComponent() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route
        element={
          <Modallike>
            <Outlet />
          </Modallike>
        }
      >
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route
        element={
          <Layout>
            <Outlet />
          </Layout>
        }
      >
        <Route path="/notice" element={<ErrorPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/curation" element={<CurationPage />} />
        <Route path="/mypage" element={<UserMyPage />} />
        <Route path="/timetable" element={<TimetablePage />} />
        <Route path="/lecture" element={<ErrorPage />} />
      </Route>
      <Route
        path="*"
        element={
          <Modallike>
            <ErrorPage />
          </Modallike>
        }
      />
    </Routes>
  );
}
