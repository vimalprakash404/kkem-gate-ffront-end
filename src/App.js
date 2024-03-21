import './App.css';
// import { useState } from 'react';
// import { useEffect } from 'react';
import ScreenHandle from './components/ScreenHandle/ScreenHandle';
import { Route, Routes} from 'react-router-dom';
import Login from './admin/Pages/Login';
import Dashboard from './admin/Pages/DashBoard';
function App() {



  return (
    <div>
       <Routes>
       <Route path="/" element={<ScreenHandle/>}/>
       <Route path="/login" element={<Login/>}/>
        <Route path='/admin' element={<Dashboard/>}/>
      
      </Routes>
    </div>
     
    
  );
}

export default App;
