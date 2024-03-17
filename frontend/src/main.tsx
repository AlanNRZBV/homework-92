import React from 'react'
import ReactDOM from 'react-dom/client'
import { router } from './router/router.tsx';
import { RouterProvider } from 'react-router-dom';
import { addInterceptors } from './axiosApi.ts';
import { store } from './app/store.ts';
import { Provider } from 'react-redux';


addInterceptors(store);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
