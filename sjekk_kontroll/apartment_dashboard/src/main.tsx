import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router.tsx'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './redux/store.ts'
import { Provider } from 'react-redux'
import './i18n'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </PersistGate>
  // </StrictMode>,
)
