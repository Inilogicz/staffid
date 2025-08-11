import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Components/Signup'; 
import Dashboard from './Components/Dashboard';
import Addstaff from './Components/Addstaff';
import Allstaff from './Components/Allstaff';
import Generateid from './Components/Generateid'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addstaff" element={<Addstaff />} />
        <Route path="/allstaff" element={<Allstaff />} />
        <Route path="/generateid" element={<Generateid />} />


      </Routes>
    </Router>
  );
}

export default App;