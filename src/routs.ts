
import Admin from "./pages/Admin";
import Basket from "./pages/Basket";
import Catalog from "./pages/Catalog";
import Compare from "./pages/Compare";
import Home from "./pages/Home";
import Loves from "./pages/Loves";
import News from "./pages/News";
import Product from "./pages/Product";
import Registration from "./pages/Registration";
import User from "./pages/User";

import {HOME_ROUTE,CATALOG_ROUTE, PRODUCT_ROUTE, COMPARE_ROUTE, BASKET_ROUTE, USER_ROUTE, REGISTRATION_ROUTE, NEWS_ROUTE, LOVES_ROUTE, ADMIN_ROUTE,  } from "./utils/routs";

export const publicRouts = [
{
    path:HOME_ROUTE,
    module:Home
},
{
    path:CATALOG_ROUTE,
    module:Catalog
},
{
    path:PRODUCT_ROUTE + '/:id',
    module:Product
},
{
    path:COMPARE_ROUTE,
    module:Compare
},
{
    path:BASKET_ROUTE,
    module:Basket
},
{
    path:USER_ROUTE,
    module:User
},
{
    path:NEWS_ROUTE,
    module:News
},
{
    path:REGISTRATION_ROUTE,
    module:Registration
},
{
    path:LOVES_ROUTE,
    module:Loves
},
{
    path:ADMIN_ROUTE,
    module:Admin
},
]

export const authRouts = [
    {
        path:HOME_ROUTE,
        module:Home
    }
    ]

