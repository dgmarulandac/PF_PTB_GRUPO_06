import './App.css';
//DEPENDENCIES
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { postLogin } from './Redux/Action/action';
import { useDispatch } from "react-redux";
import axios from "axios";
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
import Error404 from './Components/Error 404/Error404';


function App() {

  const dispatch = useDispatch();
  function handleCallbackResponse(response) {
    const user = { platform: "google", jwt: response.credential };
    dispatch(postLogin(user));
  }

  useEffect(() => {
    // Auth token
    if (localStorage.getItem("jwt")) {
      const userToken = localStorage.getItem("jwt")
      axios.defaults.headers.common = {
        'x-access-token': userToken
      }
      dispatch(postAuth(userToken))
    }
  }, [])

  useEffect(() => {
    //Auth de google - global google
    /* global google */
    google.accounts.id.initialize({
      client_id: "837161821953-g2c2ob0lolh4abs0ctt7dt4rga03evqm.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.prompt();
  }, [])

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/event/:id' element={<Detail />} />
        <Route path='/createEvent' element={<FormEvent />} />
        <Route path='/TaC' element={<TermsAndConditions />} />
        <Route path='/FAQ' element={<FAQ />} />
        <Route path='/*' element={<Error404 />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
