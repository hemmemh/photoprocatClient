import { lazy } from 'react'

import { HOME_ROUTE, CATALOG_ROUTE, PRODUCT_ROUTE, COMPARE_ROUTE, BASKET_ROUTE, USER_ROUTE, REGISTRATION_ROUTE, NEWS_ROUTE, LOVES_ROUTE, ADMIN_ROUTE } from './routs'
import Page404 from '../../pages/Page404'

const HomeLazy = lazy(async () => await import('../../pages/Home'))
const CatalogLazy = lazy(async () => await import('../../pages/Catalog'))
const AdminLazy = lazy(async () => await import('../../pages/Admin'))
const ProductLazy = lazy(async () => await import('../../pages/Product'))
const CompareLazy = lazy(async () => await import('../../pages/Compare'))
const BasketLazy = lazy(async () => await import('../../pages/Basket'))
const UserLazy = lazy(async () => await import('../../pages/User'))
const NewsLazy = lazy(async () => await import('../../pages/News'))
const RegistrationLazy = lazy(async () => await import('../../pages/Registration'))
const LovesLazy = lazy(async () => await import('../../pages/Loves'))

export const publicRouts = [
    {
        path: HOME_ROUTE,
        module: HomeLazy
    },
    {
        path: CATALOG_ROUTE,
        module: CatalogLazy
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        module: ProductLazy
    },
    {
        path: COMPARE_ROUTE,
        module: CompareLazy
    },
    {
        path: BASKET_ROUTE,
        module: BasketLazy
    },
    {
        path: USER_ROUTE,
        module: UserLazy
    },
    {
        path: NEWS_ROUTE,
        module: NewsLazy
    },
    {
        path: REGISTRATION_ROUTE,
        module: RegistrationLazy
    },
    {
        path: LOVES_ROUTE,
        module: LovesLazy
    },
    {
        path: ADMIN_ROUTE,
        module: AdminLazy
    },
    {
        path: '*',
        module: Page404
    }
]

export const authRouts = [
    {
        path: HOME_ROUTE,
        module: HomeLazy
    }
]
