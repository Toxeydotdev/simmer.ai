import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';

export function App() {
  return (
    <div className="h-full min-h-screen bg-white food-background flex flex-col gap-4">
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
