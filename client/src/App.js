import './App.css';
//DEPENDENCIES
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';

//Components
import Home from './components/Home/Home.jsx';
import Register from './components/register/register.jsx';
import Login from './components/login/login.jsx';
import FormEvent from './components/FormEvent/FormEvent.jsx';
import Detail from './components/Detail/Detail.jsx';
axios.defaults.baseURL = 'https://pf-grupo06-back.onrender.com/'


function App() {
  return (
    <div className="App">
      <header>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home/>}/>
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
