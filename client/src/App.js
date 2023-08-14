import './App.css';
//DEPENDENCIES
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';

//Components
import { Register } from './components/register/register';
import { Login } from './components/login/login';
import Home from './components/Home/Home';
import FormEvent from './components/FormEvent/FormEvent'
import Detail from './components/Detail/Detail';
// axios.defaults.baseURL = 'http://localhost:3001'
axios.defaults.baseURL = 'https://pf-grupo06-back.onrender.com/'


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
