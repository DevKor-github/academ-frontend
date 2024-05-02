import ReactDOM from 'react-dom/client';
import React from 'react';

import App from './App';
import './index.css';

console.log(`working in mode : ${process.env.NODE_ENV}`);

// src/index.tsx
if (/* process.env.NODE_ENV === 'development' && */ 'serviceWorker' in navigator) {
  console.log('dev mode - trying MSW');
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('mockServiceWorker.js')
      .then((registration) => {
        console.log('Service Worker registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('Service Worker registration failed: ', registrationError);
      });
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
