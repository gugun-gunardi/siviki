import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import Queue from './components/Queue';
import ModalInfo from './components/ModalInfo';
import { setServiceStatus } from './redux/serviceSlice';

const App = () => {
  const dispatch = useDispatch();
  const { agentBusy, isServiceActive } = useSelector((state) => state.service);
  const { showModal } = useSelector((state) => state.modal);

  useEffect(() => {
    // Simulasi pengecekan status layanan dari API
    const fetchServiceStatus = async () => {
      try {
        // const response = await axios.get('/api/service-status'); // Ganti dengan endpoint API yang sesuai
        const response = true;
        dispatch(setServiceStatus(response));
        console.log('xxxx', isServiceActive);
      } catch (error) {
        console.error('Error fetching service status:', error);
      }
    };

    fetchServiceStatus();
  }, [dispatch]);

  return (
    <Router>
      <div className='App'>
        <ModalInfo
          showModal={showModal}
          onClose={() =>
            dispatch(
              setServiceStatus({ serviceActive: false, agentBusy: false })
            )
          }
        />
        <Routes>
          <Route
            path='/register'
            element={
              isServiceActive ? <RegistrationForm /> : <Navigate to='/modal' />
            }
          />
          <Route
            path='/queue'
            element={
              isServiceActive && !agentBusy ? (
                <Navigate to='/register' />
              ) : (
                <Queue />
              )
            }
          />
          <Route
            path='/modal'
            element={
              !isServiceActive ? (
                <ModalInfo
                  showModal={true}
                  onClose={() =>
                    dispatch(
                      setServiceStatus({
                        serviceActive: false,
                        agentBusy: false,
                      })
                    )
                  }
                />
              ) : (
                <Navigate to='/register' />
              )
            }
          />
          <Route path='/' element={<Navigate to='/modal' />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
