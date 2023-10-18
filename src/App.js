import './App.css';
import React from 'react';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Admin from './pages/Admin';
import User from './pages/User';
import Form from './pages/Form'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Login/>}/> 
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/user" element={<User/>}/>
        <Route path='/form' element={<Form/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


