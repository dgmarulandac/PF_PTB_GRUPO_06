import './App.css';
//DEPENDENCIES
import axios from 'axios';
import { Route, Routes } from "react-router-dom";
//COMPONENTS
import Home from './Components/Home/Home';
import FormEvent from './Components/FormEvent/FormEvent'

axios.defaults.baseURL = 'http://localhost:3001'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/createEvent' element={<FormEvent/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
