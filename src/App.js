import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { socket } from './socket';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import SocketContext from './contexts/SocketContext';

function App() {
  return (
    <div className='dark'>
      <SocketContext.Provider value={socket}>
        <Router>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Routes>
        </Router>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
