import './App.css';
import 'tailwindcss/tailwind.css';
//DEPENDENCIES
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
import EditEvent from './Components/EditEvent/EditEvent';
import Error404 from './Components/Error 404/Error404';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import RecoverPassword from './Components/RecoverPassword/RecoverPassword';
import EventsDashboard from './Components/EventsDashboard/EventsDashboard';
import AdminPanel from './Components/AdminPanel/AdminPanel';
import SalesPay from './Components/Sales/SalesPay';
import MisCompras from './Components/UserDashboard/MisCompras'
import UserProfile from './Components/UserPerfil/UserProfile';
import AboutUs from './Components/AboutUS/AboutUS';

//Componentes Autorizacion
import NotLoggedElement from './Utils/AutorizationComponents/NotLoggedElement';
import SellerOrAdminElement from './Utils/AutorizationComponents/SellerOrAdminElement';
import LoggedElement from './Utils/AutorizationComponents/LoggedElement';
import AdminElement from './Utils/AutorizationComponents/AdminElement';
import DetailUser from './Components/AdminPanel/DetailUser/DetailUser';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    //Creacion del localStorage para el carrito en caso de no estar logueado
    // findOrCreateShoppingCar()
    // Auth token
    if (localStorage.getItem("jwt")) {
      const userToken = localStorage.getItem("jwt")
      dispatch(postAuth(userToken))
    }
  }, [])

  return (
    <div className="App bg-whithe dark:bg-fondoDark flex flex-col">
      <Nav />
      <Routes>
        <Route path='/*' element={<Error404 />} />
        <Route path='/' element={<Home />} />
        <Route path='/FAQ' element={<FAQ />} />
        <Route path='/event/:id' element={<Detail />} />
        <Route path='/sales/:id' element={<SalesPay />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<NotLoggedElement><Register /></NotLoggedElement>} />
        <Route path='/passwordReset' element={<NotLoggedElement><ResetPassword /></NotLoggedElement>} />
        <Route path='/passwordRecover/:token' element={<NotLoggedElement><RecoverPassword /></NotLoggedElement>} />
        <Route path='/MiPerfil' element={<LoggedElement><UserProfile/></LoggedElement>} />
        <Route path='/TaC' element={<LoggedElement><TermsAndConditions /></LoggedElement>} />
        <Route path='/createEvent' element={<SellerOrAdminElement><FormEvent /></SellerOrAdminElement>} />
        <Route path='/myEvents' element={<SellerOrAdminElement><EventsDashboard/></SellerOrAdminElement>}/>
        <Route path='/editEvent/:id' element={<SellerOrAdminElement><EditEvent/></SellerOrAdminElement>}/> 
        <Route path='/about' element={<AboutUs />} />
        <Route path='/myEvents' element={<SellerOrAdminElement><EventsDashboard /></SellerOrAdminElement>} />
        <Route path='/editEvent/:id' element={<SellerOrAdminElement><EditEvent /></SellerOrAdminElement>} />
        <Route path='/misCompras' element={<MisCompras/>}/>
        <Route path='/Admin/Panel' element={<AdminPanel />} />
        <Route path='/Admin/Panel/:id' element={<DetailUser />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
