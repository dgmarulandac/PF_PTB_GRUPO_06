import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "./Redux/Store/store";
import axios from 'axios';

//axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.baseURL = 'https://pf-grupo06-back.onrender.com';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="837161821953-g2c2ob0lolh4abs0ctt7dt4rga03evqm.apps.googleusercontent.com">      
    <Provider store={store}>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </Provider>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
