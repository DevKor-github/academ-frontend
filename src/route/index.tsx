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
  NoticePage,
} from '../pages/index';
import { RenderTriggerProvider } from '../contexts/RenderTriggerContext';
import { Layout } from '../components';

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
        <Route path="/notice" element={<NoticePage />} />
        <Route path="/curation" element={<CurationPage />} />
        <Route path="/mypage" element={<UserMyPage />} />
        <Route path="/timetable" element={<TimetablePage />} />
        <Route path="/lecture/:id" element={<LecturePage />} />

        <Route path="/lecture" element={<LecturesPage />} />

        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route
        element={
          <Layout>
            <RenderTriggerProvider>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100vw',
                  height: '100%',
                }}
              >
                <Outlet />
              </div>
            </RenderTriggerProvider>
          </Layout>
        }
      >
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}
