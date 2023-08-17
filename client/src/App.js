import './App.css';
//DEPENDENCIES
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

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

  function handleCallbackResponse(response) {
    console.log(`Encoded JWT ID Token: ${response.credential}`);
  }

  useEffect(()=>{
    //Auth de google - global google
    /* global google */
    google.accounts.id.initialize({
      client_id: "837161821953-g2c2ob0lolh4abs0ctt7dt4rga03evqm.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("singInDiv"),
      { theme: "outline", size: "large"}
    )
  },[])

  return (
    <div className="App">
      <Nav />
      <div id='singInDiv'></div>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login />}/> 
          <Route path='/register' element={<Register />} />
          <Route path='/event/:id' element={<Detail/>}/>
          <Route path='/createEvent' element={<FormEvent/>}/>
          <Route path='/TaC' element={<TermsAndConditions/>}/>
          <Route path='/FAQ' element={<FAQ/>}/>
        </Routes>
      <Footer/>
    </div>
  );
}

export default App;
