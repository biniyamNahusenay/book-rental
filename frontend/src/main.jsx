import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import store from "./redux/store.js";
import { Provider } from "react-redux";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import Signup from './pages/Auth/Signup.jsx';
import Login from './pages/Auth/Login.jsx';
import AdminRoute from './pages/Admin/AdminRoute.jsx';
import AdminDashboaard from './pages/Admin/dashboard/AdminDashboaard.jsx';
import AdminBooks from './pages/Admin/AdminBooks.jsx';
import Dashboard from './pages/Admin/dashboard/Dashboard.jsx';
import AdminOthers from './pages/Admin/dashboard/AdminOthers.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
       <Route path='/signup' element={<Signup/>}/>
       <Route path='/login' element={<Login/>}/>

       <Route path="" element={<AdminRoute />}>
         <Route path='' element={<AdminDashboaard/>}>
            <Route path='/admin/dashboard' element={<Dashboard/>}/>
            <Route path='/admin/books' element={<AdminBooks/>}/>
            <Route path='/admin/owners' element={<AdminOthers/>}/>
         </Route>
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
 <Provider store={store}>
     <RouterProvider router={router}/>
 </Provider>
)