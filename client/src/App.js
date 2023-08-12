import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Register } from './components/register/register';
import { Login } from './components/login/login';

function App() {
  return (
    <div className="App">
      <header>
      </header>
      <main>
        <Routes>
          <Route path='/login' element={<Login />}/> 
          <Route path='/register' element={<Register />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
