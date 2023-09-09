import './App.css';
import Home from './components/Home/Home';
import {Route, Routes} from 'react-router-dom';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import { PopupContexProvider } from './contex/popupContex';
// import 'dotenv/config'

function App() {
  
  const authToken = localStorage.getItem('auth-token');


  return (
    <PopupContexProvider>
      <div className="App">

          <Routes>
            <Route  exact path='/register' element={<Register/>} />
            <Route  exact path='/login' element={<Login/>} />

            <Route  exact path='/*' element={<Home/>} />
          </Routes>

      </div>
    </PopupContexProvider>
  );
}

export default App;
