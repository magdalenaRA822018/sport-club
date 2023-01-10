import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import {store} from './store/store';
import { Provider } from 'react-redux';
import './fonts/Roboto-Regular.ttf'
import './fonts/Gilroy-Light.otf'
import './fonts/FontsFree-Net-Gilroy-Bold.ttf'
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path='/*' element={<App />} ></Route>
        </Routes>
        </Provider>
    </BrowserRouter>
  </React.StrictMode>
 ,
  document.getElementById('root')
);
