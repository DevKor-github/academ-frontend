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
import { Layout } from '../components/Layout';

// function RouteComponent1() {
//   return (
//     <Routes>
//       <Route path="/" element={<MainPage />} />
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/logout" element={<LogoutPage />} />
//       <Route path="/register" element={<RegisterPage />} />
//       <Route path="/search" element={<SearchPage />} />
//       <Route path="/curation" element={<SearchPage />} />
//       <Route path="*" element={<ErrorPage code="HTTP 404 Error" />} />
//     </Routes>
//   );
// }

export function RouteComponent() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<MainPage />} />
      <Route
        element={
          <Layout>
            <Outlet />
          </Layout>
        }
      >
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/curation" element={<CurationPage />} />
        <Route path="/mypage" element={<UserMyPage />} />
        <Route path="/timetable" element={<TimetablePage />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
