import './App.css';
//DEPENDENCIES
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';

//Components
import { Register } from './Components/register/register';
import { Login } from './Components/login/login';
import Home from './Components/Home/Home';
import FormEvent from './Components/FormEvent/FormEvent'
import Detail from './Components/Detail/Detail';
import BrowseFileUpdate from './Components/BrowseFileUpdate/BrowseFileUpdate';
import FAQ from './views/FAQs/FAQs';
import TermsAndConditions from './views/TermsAndConditions/TermsAndConditions';
// axios.defaults.baseURL = 'http://localhost:3001'
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
          <Route path='/preguntasfrecuentes' element={<FAQ />}/>
          <Route path='/terminosycondiciones' element={<TermsAndConditions />}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
