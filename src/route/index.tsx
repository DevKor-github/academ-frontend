import { Route, Routes, Outlet } from 'react-router-dom';

import {
  UserMyPage,
  TimetablePage,
  LecturePage,
  CurationPage,
  ErrorPage,
  LoginPage,
  LogoutPage,
  MainPage,
  LecturesPage,
  RegisterPage,
} from '../pages';
import { Layout, Modallike } from '../components';

export function RouteComponent() {
  return (
    <Routes>
      <Route
        element={
          <Layout>
            <Outlet />
          </Layout>
        }
      >
        <Route path="/" element={<MainPage />} />
        <Route path="/notice" element={<ErrorPage />} />
        <Route path="/curation" element={<CurationPage />} />
        <Route path="/mypage" element={<UserMyPage />} />
        <Route path="/timetable" element={<TimetablePage />} />
        <Route path="/lecture/:id" element={<LecturePage />} />

        <Route path="/lecture" element={<LecturesPage />} />
      </Route>

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
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}
