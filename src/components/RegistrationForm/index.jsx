import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '../../redux/modalSlice';
import { setServiceStatus } from '../../redux/serviceSlice';
import ModalInfo from '../ModalInfo';
import Queue from '../Queue'; // Pastikan Queue sudah dibuat
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showModal = useSelector((state) => state.modal.showModal); // Ambil state modal dari Redux
  const isServiceActive = useSelector((state) => state.service.isServiceActive); // Ambil status layanan dari Redux
  const agentBusy = useSelector((state) => state.service.agentBusy);
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    phone: '',
    kategori: '',
    pemohon: '',
    agreement: false,
  });

  // Handle perubahan input
  const handleChange = (e) => {
    const { id, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [id]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreement) {
      alert('Anda harus menyetujui Syarat dan Ketentuan.');
      return;
    }

    if (!isServiceActive) {
      dispatch(toggleModal(true)); // Tampilkan modal jika layanan tidak aktif
      return;
    }
    // Pengecekan API untuk memeriksa apakah ada agent yang tersedia
    try {
      //   const response = await axios.get('/api/check-agent'); // Ubah URL sesuai API Anda
      const response = false;
      if (response) {
        navigate('https://www.xxxx.com'); // Redirect jika agent tersedia
      } else {
        dispatch(
          setServiceStatus({ agentBusy: true, serviceActive: isServiceActive })
        ); // Tampilkan antrian jika tidak ada agent
      }
    } catch (error) {
      console.error('Terjadi kesalahan saat memeriksa agent:', error);
    }
  };

  // Handle modal close
  const handleCloseModal = () => {
    dispatch(toggleModal(false)); // Menutup modal
  };

  return (
    <div className='container'>
      {/* ModalInfo untuk menampilkan informasi layanan tidak aktif */}
      <ModalInfo showModal={showModal} onClose={handleCloseModal} />

      {/* Jika ada antrian, tampilkan komponen Queue */}
      {agentBusy ? (
        <Queue />
      ) : (
        // Jika antrian tidak tampil, tampilkan form registrasi
        <>
          <div className='row'>
            <div className='col'></div>
            <div className='col text-center'>
              <img
                className='mt-5'
                src='https://botmaster-files.s3.ap-southeast-1.amazonaws.com/Content/d00ce1f65bcc385d6c1a6ed17797b8d8a890428e/siviki%20logo.png'
                alt='Logo'
                width='160'
              />
            </div>
            <div className='col'></div>
          </div>

          <div className='row' style={{ margin: '20px' }}>
            <div className='col'>
              <div className='card' style={{ border: 'none' }}>
                <div className='card-body'>
                  <h4 className='card-title'>Registrasi</h4>
                  <form onSubmit={handleSubmit} autoComplete='off'>
                    <div className='form-floating mb-2'>
                      <input
                        type='text'
                        className='form-control'
                        id='nama'
                        placeholder='Nama Lengkap'
                        value={formData.nama}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor='nama'>Nama Lengkap</label>
                    </div>
                    <div className='form-floating mb-2'>
                      <input
                        type='email'
                        className='form-control'
                        id='email'
                        placeholder='Email'
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor='email'>Email</label>
                    </div>
                    <div className='form-floating mb-2'>
                      <input
                        type='tel'
                        className='form-control'
                        id='phone'
                        placeholder='Nomor Telepon'
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor='phone'>Nomor Telepon</label>
                    </div>
                    <div className='form-floating mb-2'>
                      <select
                        className='form-control form-select'
                        id='kategori'
                        value={formData.kategori}
                        onChange={handleChange}
                        required
                      >
                        <option value='' disabled>
                          -- Pilih Kategori --
                        </option>
                        <option value='Indikasi Geografis'>
                          Indikasi Geografis
                        </option>
                        <option value='Design Tata Letak Sirkuit Terpadu'>
                          Design Tata Letak Sirkuit Terpadu
                        </option>
                        <option value='Aduan Layanan'>Aduan Layanan</option>
                        <option value='Merek'>Merek</option>
                        <option value='Design Industri'>Design Industri</option>
                        <option value='Hak Cipta'>Hak Cipta</option>
                        <option value='HKI Umum'>HKI Umum</option>
                        <option value='Paten'>Paten</option>
                        <option value='Rahasia Dagang'>Rahasia Dagang</option>
                      </select>
                      <label htmlFor='kategori'>Kategori</label>
                    </div>
                    <div className='form-floating mb-2'>
                      <select
                        className='form-control form-select'
                        id='pemohon'
                        value={formData.pemohon}
                        onChange={handleChange}
                        required
                      >
                        <option value='' disabled>
                          -- Pilih Asal Pemohon --
                        </option>
                        <option value='Badan Hukum'>Badan Hukum</option>
                        <option value='Kementerian/Lembaga'>
                          Kementerian/Lembaga
                        </option>
                        <option value='Konsultan KI'>Konsultan KI</option>
                        <option value='Litbang'>Litbang</option>
                        <option value='Perguruan Tinggi'>
                          Perguruan Tinggi
                        </option>
                        <option value='Perorangan'>Perorangan</option>
                        <option value='Sentra KI Kementerian'>
                          Sentra KI Kementerian
                        </option>
                        <option value='Sentra KI Litbang'>
                          Sentra KI Litbang
                        </option>
                        <option value='Sentra KI Perguruan Tinggi'>
                          Sentra KI Perguruan Tinggi
                        </option>
                        <option value='UMKM'>UMKM</option>
                      </select>
                      <label htmlFor='pemohon'>Asal Pemohon</label>
                    </div>
                    <div className='agreement mb-2'>
                      <input
                        type='checkbox'
                        id='agreement'
                        checked={formData.agreement}
                        onChange={handleChange}
                      />
                      <label htmlFor='agreement'>
                        Saya setuju dengan Syarat dan Ketentuan
                      </label>
                    </div>
                    <button
                      type='submit'
                      className='btn btn-primary form-control'
                      disabled={!formData.agreement}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className='col'>
              <div
                className='card'
                style={{ border: 'none', '--bs-card-bg': 'none' }}
              >
                <div className='card-body'>
                  <h4 className='card-title'>Ketentuan Video Conference</h4>

                  <div className='card' style={{ '--bs-card-bg': 'none' }}>
                    <div className='card-body'>
                      <div className='row text-center'>
                        <div className='col'>Maksimal Waktu 15 Menit</div>

                        <div className='col'>Wajib Mengaktifkan Microphone</div>

                        <div className='col'>Wajib Mengaktifkan Kamera</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className='card'
                style={{ border: 'none', '--bs-card-bg': 'none' }}
              >
                <div className='card-body'>
                  <h4 className='card-title'>Profile DJKI</h4>

                  <iframe
                    width='100%'
                    height='100%'
                    src='https://www.youtube.com/embed/zO6lY1M_NIY?autoplay=1&amp;mute=1'
                    title='Tutorial Video Conference'
                    frameBorder='0'
                    allowFullScreen
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    style={{ minHeight: '240px', flexGrow: 1 }}
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RegistrationForm;
