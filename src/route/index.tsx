import { Route, Routes } from 'react-router-dom';

import { MainPage } from '../pages/Main';
import { LoginPage } from '../pages/Login';
// import { ListPage } from '../pages/List';

export function RouteComponent() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}
