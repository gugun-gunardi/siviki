import { useDispatch, useSelector } from 'react-redux';
import { setServiceStatus } from '../../redux/serviceSlice';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo_djki_kemenkumham.png';
import './queue.css';
const Queue = () => {
  const dispatch = useDispatch();
  const { agentBusy } = useSelector((state) => state.service);
  const navigate = useNavigate(); // Inisialisasi navigate

  // Fungsi untuk membatalkan antrian dan kembali ke form registrasi
  const handleCancelQueue = () => {
    dispatch(setServiceStatus({ agentBusy: false, serviceActive: true }));
    navigate('/register'); // Mengarahkan kembali ke form registrasi
  };

  // useEffect(() => {
  //   dispatch(fetchServiceStatus()); // Panggil untuk mengambil status layanan dan agent
  // }, [dispatch]);

  return (
    <div className='queue-container'>
      <div className='queue-logo'>
        <img src={logo} alt='SIVIKI Logo' width='100' />
      </div>
      <div className='queue-position'>
        <p>Posisi Antrian Saat Ini</p>
        <div className='queue-number'>0</div>
        <p>Posisi Anda dalam antrian: 1</p>
      </div>
      {agentBusy && <p>Agent sedang sibuk, silakan tunggu...</p>}
      <button className='btn-cancel' onClick={handleCancelQueue}>
        Batalkan Sesi
      </button>
      <div className='queue-info'>
        <p>
          Mohon tunggu, agent kami akan segera melayani Anda. Jangan menutup
          tampilan browser Anda.
        </p>
      </div>
      <div className='queue-warning'>
        <p>
          <strong>Pelanggan Yth,</strong> seluruh interaksi ini akan kami rekam.{' '}
          <strong>
            Dimohon untuk tidak mengambil atau/menyebarluaskan
            audio/gambar/video dari interaksi percakapan.
          </strong>{' '}
          Kegiatan tersebut termasuk dalam penyalahgunaan dan akan ditindak
          sesuai dengan peraturan perundang-undangan yang berlaku.
        </p>
      </div>
    </div>
  );
};

export default Queue;
