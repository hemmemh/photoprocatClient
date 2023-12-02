import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'

import { Provider } from 'react-redux'
import { store } from './store2/store'
import SpinnerBody from './components/UI/spinnerBody/SpinnerBody'
import ErrorBoundary from './app/ErrorBoundary'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)
root.render(

    <Suspense fallback={<SpinnerBody/>}>
        <Provider store={store}>
            <ErrorBoundary>
                <App />
            </ErrorBoundary>
        </Provider>
    </Suspense>

)
