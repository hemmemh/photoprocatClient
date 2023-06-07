import AppRouter from "./components/appRouter/AppRouter";
import { BrowserRouter } from 'react-router-dom';
import './styles/style.scss';
import { useState,useEffect,useRef,useContext } from 'react'
import { getUser, refresh } from "./https/userApi";
import { log } from "console";
import { Context } from ".";
import jwtDecode from 'jwt-decode'

function App() {
  const {user} = useContext(Context)
  const [loader, setloader] = useState(false)
  useEffect(() => {
    setloader(false)
     refresh().then(e=>{
         console.log(jwtDecode<any>(e.refreshToken));
         user.setuser(jwtDecode<any>(e.refreshToken))
     }).finally(()=>{
      setloader(true)
     })
  }, [])
  
  return (
 
    <div className="App">
      {loader &&
<BrowserRouter>

  <AppRouter/>

</BrowserRouter>
}
    </div>
  );
}

export default App;
