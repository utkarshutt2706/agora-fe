import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import PrivateRoute from './pages/PrivateRoute';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/*' element={<PrivateRoute />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
