import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import store from "./redux/store.js";
import { Provider } from "react-redux";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import Signup from './pages/Auth/Signup.jsx';
import Login from './pages/Auth/Login.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
       <Route path='/signup' element={<Signup/>}/>
       <Route path='/login' element={<Login/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
 <Provider store={store}>
     <RouterProvider router={router}/>
 </Provider>
)