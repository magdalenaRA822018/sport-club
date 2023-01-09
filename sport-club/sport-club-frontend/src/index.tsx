import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import AuthContextProvider from './context/auth-context';
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import {store} from './store/store';
import { Provider } from 'react-redux';
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
      <Provider store={store}>
        <Routes>
          <Route path='/*' element={<App />} ></Route>
        </Routes>
        </Provider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
 ,
  document.getElementById('root')
);
