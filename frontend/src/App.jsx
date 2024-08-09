import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Outlet } from 'react-router';

function App() {
  return (
    <>
    <ToastContainer/>
    <main className='py-3'>
      <Outlet/>
    </main>
    </>
  )
}

export default App
