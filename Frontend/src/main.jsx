import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SocketProvider } from './config/SocketContext'; // Import SocketProvider

// Create a root for rendering
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App wrapped in SocketProvider
root.render(
  <SocketProvider>
    <App />
  </SocketProvider>
);
