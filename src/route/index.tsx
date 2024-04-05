import { Route, Routes } from 'react-router-dom';

import { RegisterPage } from '../pages/Register';
import { MainPage } from '../pages/Main';
import { LogoutPage } from '../pages/Logout';
import { LoginPage } from '../pages/Login';
// import { ListPage } from '../pages/List';

export function RouteComponent() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}
