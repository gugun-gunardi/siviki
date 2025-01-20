import React from 'react';

const ModalInfo = ({ showModal, onClose }) => {
  if (!showModal) return null;

  return (
    <div className='modal fade show' style={{ display: 'block' }}>
      <div className='modal-dialog modal-dialog-centered modal-lg'>
        <div className='modal-content'>
          <div className='modal-header' style={{ borderBottom: 'none' }}>
            <button
              type='button'
              className='btn-close'
              onClick={onClose}
            ></button>
          </div>
          <div className='modal-body'>
            <div className='row'>
              <div className='col'></div>
              <div className='col text-center'>
                <img
                  src='https://botmaster-files.s3.ap-southeast-1.amazonaws.com/Content/d00ce1f65bcc385d6c1a6ed17797b8d8a890428e/siviki%20logo.png'
                  alt='Logo'
                  width='160'
                />
              </div>
              <div className='col'></div>
            </div>
            <div
              className='card-body text-center mt-3 p-3'
              style={{ background: '#E6F4FF', borderRadius: '10px' }}
            >
              <p>
                <strong>
                  Mohon Maaf, Layanan SIVIKI saat ini tidak tersedia.
                </strong>
              </p>
              <p>
                Silahkan hubungi kembali pada Hari Senin - Kamis pukul 08.00 -
                15.00 WIB dan pada Hari Jumat pukul 08.00 - 15.30 WIB.
              </p>
              <p>Terima kasih</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalInfo;
