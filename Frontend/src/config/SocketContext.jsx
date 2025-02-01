import React, { createContext, useContext } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = "http://localhost:3000"; // Change this to your backend URL
const socket = io(SOCKET_URL, {
  transports: ["websocket"],
});

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
