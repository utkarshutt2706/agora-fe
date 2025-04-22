import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { Toaster } from './components/ui/sonner';
import Login from './pages/Login';
import PrivateRoute from './pages/PrivateRoute';
import Register from './pages/Register';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/*' element={<PrivateRoute />} />
        </Routes>
      </Router>
      <Toaster richColors position='top-right' />
    </>
  );
}

export default App;
