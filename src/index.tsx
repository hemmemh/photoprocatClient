import React,{createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import BrandStore from './store/brandStore';
import UserStore from './store/userStore';
import NavbarStore from './store/navbarStore';

interface Store{
  brand: BrandStore
  user:UserStore
  navbar:NavbarStore
}
export const Context= createContext<Store>({
  brand:new BrandStore(),
  navbar:new NavbarStore(),
  user:new UserStore()
 
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Context.Provider value ={{
    brand:new BrandStore(),
    user:new UserStore(),
    navbar:new NavbarStore(),
  }}>
    <App />
    </Context.Provider>
);


