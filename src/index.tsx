import ReactDOM from 'react-dom/client';
import React from 'react';

import App from './App';
import './index.css';

// Unregister service worker since we removed MSW
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const registration of registrations) {
      registration.unregister();
    }
  });
}

// 리액트로 짠 모든 코드가 App 컴포넌트 안에 들어가게 됩니다.
// root를 찾아서 App 컴포넌트를 렌더링합니다.
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
