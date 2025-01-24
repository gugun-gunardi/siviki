import { useDispatch, useSelector } from 'react-redux';
import { resetService } from '../../redux/serviceSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/images/logo_djki_kemenkumham.png';
import './queue.css';
import VideoCallListener from '../VideocallListener';
const Queue = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { queuePosition, ticketId, userId } = useSelector(
    (state) => state.service
  );

  // Fungsi untuk membatalkan antrian dan kembali ke form registrasi
  const handleCancelQueue = async () => {
    if (!ticketId) {
      alert('Tidak ada sesi yang sedang berlangsung.');
      return;
    }

    try {
      const response = await axios.post(
        'http://10.14.151.110:3000/api/cancel-session',
        { ticket_id: ticketId, user_id: userId },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      alert('Sesi berhasil dibatalkan.');
      const result = response.data;
      console.log(result);
      // Reset state Redux
      dispatch(resetService());

      // Arahkan kembali ke halaman registrasi
      navigate('/register');
    } catch (error) {
      console.error('Gagal membatalkan sesi:', error);
      alert('Gagal membatalkan sesi. Silakan coba lagi.');
    }
  };

  return (
    <div className='queue-container'>
      <VideoCallListener ticketId={ticketId} />
      <div className='queue-logo'>
        <img src={logo} alt='SIVIKI Logo' width='100' />
      </div>
      <div className='queue-position'>
        <p>Posisi Antrian Saat Ini</p>
        <div className='queue-number'>{queuePosition}</div>
      </div>
      <p>Mohon tunggu, agent kami akan segera melayani Anda...</p>
      <button className='btn-cancel' onClick={handleCancelQueue}>
        Batalkan Sesi
      </button>
      <div className='queue-warning'>
        <p>
          <strong>Pelanggan Yth,</strong> seluruh interaksi ini akan kami rekam.{' '}
          <strong>
            Dilarang mengambil atau menyebarluaskan audio/gambar/video dari
            interaksi ini.
          </strong>{' '}
          Penyalahgunaan akan ditindak sesuai dengan hukum yang berlaku.
        </p>
      </div>
    </div>
  );
};

export default Queue;
