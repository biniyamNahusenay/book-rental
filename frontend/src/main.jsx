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
import Odashboard from './pages/Owner/dashboard/Odashboard.jsx';
import BookUpload from './pages/Owner/BookUpload.jsx';
import OwnerDashboard from './pages/Owner/OwnerDashboard.jsx';
import OwnerRoute from './pages/Owner/dashboard/OwnerRoute.jsx';
import Home from './pages/Home.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
       <Route path='/signup' element={<Signup/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route index={true} path='/' element={<Home/>}/>

       <Route path="" element={<AdminRoute />}>
         <Route path='' element={<AdminDashboaard/>}>
            <Route path='/admin/dashboard' element={<Dashboard/>}/>
            <Route path='/admin/books' element={<AdminBooks/>}/>
            <Route path='/admin/owners' element={<AdminOthers/>}/>
         </Route>
      </Route>
      
      <Route path='' element={<OwnerDashboard/>}>
        <Route path='' element={<OwnerRoute/>}> 
          <Route path='/owner/dashboard' element={<Odashboard/>}/>
          <Route path='/owner/upload' element={<BookUpload/>}/>
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