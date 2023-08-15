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
import Nav from './Components/Nav/Nav';
import Footer from './Components/Footer/Footer';
import TermsAndConditions from './Components/TermsAndConditions/TermsAndConditions';
import FAQ from './Components/FAQs/FAQs';
axios.defaults.baseURL = 'https://pf-grupo06-back.onrender.com';


function App() {
  return (
    <div className="App">
      <header>
      </header>
      <Nav />
      <main>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login />}/> 
          <Route path='/register' element={<Register />} />
          <Route path='/event/:id' element={<Detail/>}/>
          <Route path='/createEvent' element={<FormEvent/>}/>
          <Route path='/TaC' element={<TermsAndConditions/>}/>
          <Route path='/FAQ' element={<FAQ/>}/>
        </Routes>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
