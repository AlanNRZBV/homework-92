import ReactDOM from 'react-dom/client';
import { router } from './router/router.tsx';
import { RouterProvider } from 'react-router-dom';
import { addInterceptors } from './axiosApi.ts';
import { persistor, store } from './app/store.ts';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';

addInterceptors(store);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </PersistGate>,
);
