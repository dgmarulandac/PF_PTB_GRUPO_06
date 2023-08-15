import './App.css';
//DEPENDENCIES
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';

//Components
import Home from './Components/Home/Home';
import Register from './Components/register/register';
import Login from './Components/login/login';
import FormEvent from './Components/FormEvent/FormEvent';
import Detail from './Components/Detail/Detail';
axios.defaults.baseURL = 'https://pf-grupo06-back.onrender.com'


function App() {
  return (
    <div className="App">
      <header>
      </header>
      <main>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/login' element={<Login />}/> 
          <Route path='/register' element={<Register />} />
          <Route path='/ticket/:id' element={<Detail/>}/>
          <Route path='/createEvent' element={<FormEvent/>}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
