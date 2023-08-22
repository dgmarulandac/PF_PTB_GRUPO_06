import './App.css';
//DEPENDENCIES
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { postLogin, postAuth } from './Redux/Action/action';
import { useDispatch } from "react-redux";
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
import ResetPassword from './Components/ResetPassword/ResetPassword';
import RecoverPassword from './Components/RecoverPassword/RecoverPassword';
import NotLoggedElement from './Utils/AutorizationComponents/NotLoggedElement';
import SellerOrAdminElement from './Utils/AutorizationComponents/SellerOrAdminElement';
import LoggedElement from './Utils/AutorizationComponents/LoggedElement';

function App() {

  const dispatch = useDispatch();

  function handleCallbackResponse(response) {
    const user = { platform: "google", jwt: response.credential };
    dispatch(postLogin(user));
  }

  useEffect(() => {

    // Auth token
    if (localStorage.getItem("jwt")) {
      const userToken = localStorage.getItem("jwt");
      dispatch(postAuth(userToken));
    }

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
        <Route path='/*' element={<Error404 />} />
        <Route path='/' element={<Home />} />
        <Route path='/FAQ' element={<FAQ />} />
        <Route path='/login' element={<NotLoggedElement><Login /></NotLoggedElement>} />
        <Route path='/register' element={<NotLoggedElement><Register /></NotLoggedElement>} />
        <Route path='/passwordReset' element={<NotLoggedElement><ResetPassword/></NotLoggedElement>}/>
        <Route path='/passwordRecover/:token' element={<NotLoggedElement><RecoverPassword/></NotLoggedElement>}/>
        <Route path='/event/:id' element={<LoggedElement><Detail /></LoggedElement>} />
        <Route path='/TaC' element={<LoggedElement><TermsAndConditions /></LoggedElement>} />
        <Route path='/createEvent' element={<SellerOrAdminElement><FormEvent /></SellerOrAdminElement>} />
      </Routes>
      <Footer />

    </div>
  );
}

export default App;
