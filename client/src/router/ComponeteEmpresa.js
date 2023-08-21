import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Home from '../Components/Home/Home';
import Register from '../Components/register/register';
import Login from '../Components/login/login';
import FormEvent from '../Components/FormEvent/FormEvent';
import Detail from '../Components/Detail/Detail';
import TermsAndConditions from '../Components/TermsAndConditions/TermsAndConditions';
import FAQ from '../Components/FAQs/FAQs'

const ComponenteEmpresa = () => {
    return (
        <div>
            <Routes>
                <Route path='/home' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/event/:id' element={<Detail />} />
                <Route path='/createEvent' element={<FormEvent />} />
                <Route path='/TaC' element={<TermsAndConditions />} />
                <Route path='/FAQ' element={<FAQ />} />
            </Routes>
            <Outlet />
        </div>
    )
}

export default ComponenteEmpresa;
