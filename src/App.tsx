import AppRouter from "./components/appRouter/AppRouter";
import { BrowserRouter } from 'react-router-dom';
import './styles/style.scss';
import { useState,useEffect,useRef,useContext } from 'react'
import { getUser, refresh } from "./https/userApi";
import { log } from "console";
import { Context } from ".";
import jwtDecode from 'jwt-decode'
import { getBasket } from "./https/basketApi";
import { getCompare } from "./https/compareApi";


function App() {
  const {user} = useContext(Context)
  const {navbar} = useContext(Context)
  const [loader, setloader] = useState(false)
  useEffect(() => {
    setloader(false)
     refresh().then(e=>{
         console.log(jwtDecode<any>(e.refreshToken),'OOPPPO');
         user.setuser(jwtDecode<any>(e.refreshToken))


     }).then(data=>{
      getBasket({id:user.user.id}).then(data=> navbar.setProducts(data.basketItems.length))
      getCompare({id:user.user.compare}).then(data=>navbar.setCompares(data.compareItems.length) )
     }).finally(()=>{
      setloader(true)
      console.log(navbar.compares,navbar.products,'uuui');
      
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

export default App ;
