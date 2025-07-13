import { io } from 'socket.io-client';
import { baseUrl } from './constants/app_constants';

export const socket = io(baseUrl, {
    autoConnect: false,
    reconnectionAttempts: 5,
});

socket.on('connect', () => {
    console.log('connected');
})

socket.on('disconnect', () => {
    console.log('disconnected');
})