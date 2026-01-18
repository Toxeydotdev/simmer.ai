import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Socials from './components/Socials';

export function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
      <Socials />
    </div>
  );
}

export default App;
