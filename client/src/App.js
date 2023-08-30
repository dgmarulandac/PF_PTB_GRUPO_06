import './App.css';
import 'tailwindcss/tailwind.css';
//DEPENDENCIES
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { postLogin, postAuth } from './Redux/Action/action';
import { useSelector, useDispatch } from "react-redux";
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
import EditEvent from './Components/EditEvent/EditEvent';
import Error404 from './Components/Error 404/Error404';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import RecoverPassword from './Components/RecoverPassword/RecoverPassword';
import EventsDashboard from './Components/EventsDashboard/EventsDashboard';
import AdminPanel from './Components/AdminPanel/AdminPanel';

//Componentes Autorizacion
import NotLoggedElement from './Utils/AutorizationComponents/NotLoggedElement';
import SellerOrAdminElement from './Utils/AutorizationComponents/SellerOrAdminElement';
import LoggedElement from './Utils/AutorizationComponents/LoggedElement';


import SalesPay from './Components/Sales/SalesPay';
import findOrCreateShoppingCar from './Utils/CreateShoppingCar/shoppingCar';


function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userSesion = useSelector(state => state.userSesion)
  
  function handleCallbackResponse(response) {
    const user = { platform: "google", jwt: response.credential };
    dispatch(postLogin(user));
  }

  useEffect(() => {
    //Creacion del localStorage para el carrito en caso de no estar logueado
    findOrCreateShoppingCar()
    // Auth token
    if (localStorage.getItem("jwt")) {
      const userToken = localStorage.getItem("jwt")
      dispatch(postAuth(userToken))
    }

    //Auth de google - global google
    /* global google */
    google.accounts.id.initialize({
      client_id: "837161821953-g2c2ob0lolh4abs0ctt7dt4rga03evqm.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.prompt();
  }, [])

  // useEffect(() => {
  //       navigate('/')
  //   }, [userSesion])

  return (
    <div className="App bg-whithe dark:bg-fondoDark"> 
      <Nav />
      <Routes>
        <Route path='/*' element={<Error404 />} />
        <Route path='/Admin/Panel' element={<AdminPanel />} />
        <Route path='/' element={<Home />} />
        <Route path='/FAQ' element={<FAQ />} />
        <Route path='/event/:id' element={<Detail />} />
        <Route path='/sales/:id' element={<SalesPay/>}/>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<NotLoggedElement><Register /></NotLoggedElement>} />
        <Route path='/passwordReset' element={<NotLoggedElement><ResetPassword/></NotLoggedElement>}/>
        <Route path='/passwordRecover/:token' element={<NotLoggedElement><RecoverPassword/></NotLoggedElement>}/>
        <Route path='/TaC' element={<LoggedElement><TermsAndConditions /></LoggedElement>} />
        <Route path='/createEvent' element={<SellerOrAdminElement><FormEvent /></SellerOrAdminElement>} />
        <Route path='/myEvents' element={<SellerOrAdminElement><EventsDashboard/></SellerOrAdminElement>}/>
        <Route path='/editEvent/:id' element={<SellerOrAdminElement><EditEvent/></SellerOrAdminElement>}/> 
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
