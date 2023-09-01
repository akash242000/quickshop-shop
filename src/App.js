import './App.css';
import Home from './components/Home/Home';
import {Route, Routes} from 'react-router-dom';
import Register from './components/Register/Register';
import Login from './components/Login/Login';

function App() {
  
  const authToken = localStorage.getItem('auth-token');

  return (
    <div className="App">

        <Routes>
          <Route  path='/*' element={<Home/>} />
          <Route  path='/register' element={<Register/>} />
          <Route  path='/login' element={<Login/>} />
        </Routes>

  

    </div>
  );
}

export default App;
