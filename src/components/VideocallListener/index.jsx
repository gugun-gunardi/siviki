import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const VideoCallListener = () => {
  const ticketId = useSelector((state) => state.service.ticketId);
  const navigate = useNavigate();

  useEffect(() => {
    // Koneksi ke Socket.IO server
    const socket = io('http://10.14.151.110:3000'); // Sesuaikan dengan server Anda

    socket.on('video-call-link', (data) => {
      //   console.log(data);
      const receivedTicketId = data.ticketId;
      const videoCallLink = data.videoCallLink;

      if (receivedTicketId === ticketId) {
        console.log('Menerima link video call:', videoCallLink);
        window.location.href = videoCallLink; // Redirect ke link video call
      } else {
        console.warn('Ticket ID tidak sesuai, tidak melakukan redirect.');
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [ticketId, navigate]);

  return null; // Komponen ini hanya untuk pemrosesan event
};

export default VideoCallListener;
