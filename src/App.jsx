import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Reservation from './pages/Reservation';
import Confirmation from './pages/Confirmation';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/reservation" element={<Reservation />} />
      <Route path="/confirmation" element={<Confirmation />} />
      <Route path="/reservation" element={<Reservation />} />
    </Routes>
  );
}

export default App;
