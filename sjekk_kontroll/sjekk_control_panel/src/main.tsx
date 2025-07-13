import ReactDOM from 'react-dom/client'
import './index.css'
import './i18n'
import { Provider } from 'react-redux'
import { persistor,store } from './redux/store.ts'
import { PersistGate } from 'redux-persist/integration/react'
import { RouterProvider } from 'react-router-dom'
import router from './router.tsx'
// import { StrictMode } from 'react'

ReactDOM.createRoot(document.getElementById('root')!).render(
    // <StrictMode>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router}>
          
        </RouterProvider>

      </PersistGate>
    </Provider>
    // </StrictMode>
)
