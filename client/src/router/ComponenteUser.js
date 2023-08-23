
import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from '../Components/Home/Home';
import Register from '../Components/register/register';
import Login from '../Components/login/login';
import Detail from '../Components/Detail/Detail';
import TermsAndConditions from '../Components/TermsAndConditions/TermsAndConditions';
import FAQ from '../Components/FAQs/FAQs'


const ComponenteUser = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/event/:id' element={<Detail />} />
                <Route path='/TaC' element={<TermsAndConditions />} />
                <Route path='/FAQ' element={<FAQ />} />
            </Routes>
        </div>
    )
}

export default ComponenteUser;