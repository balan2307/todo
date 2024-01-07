import logo from './logo.svg';
import './App.css';
import Auth from './Pages/Auth';
import { AuthContext } from './Store/AuthProvider';
import { useContext } from 'react';

function App() {

  const auth=useContext(AuthContext)

  console.log("auth ",auth.isLoggedIn
  )
  return (
    <div >
     
    <Auth></Auth>
    </div>
  );
}

export default App;
