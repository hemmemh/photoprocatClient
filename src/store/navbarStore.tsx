import { makeAutoObservable } from "mobx"

export default class NavbarStore{
    _products:number
    _compares:number
   


    constructor(){
   
        this._products=0
        this._compares=0
        makeAutoObservable(this,{},{autoBind:true})
       
    }

    setProducts(products:any){
        this._products = products
        console.log(products,'5664HHH');
        
    }

    setCompares(compares:any){
        this._compares = compares
    }
    
    get products(){
        return this._products
    }

     
    get compares(){
        return this._compares
    }

  

   
}
