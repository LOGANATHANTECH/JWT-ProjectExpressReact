import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider,redirect } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import Login from './page/login.jsx'
import Register from './page/register.jsx'
import Profile from './page/profile.jsx'

const protectedLoader = () => {
  const token = localStorage.getItem('token');
  
  if (!token || token === 'null' || token === 'undefined') {
    return redirect("/login");
  }
  
  
  return null; 
};


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorelement: <div>error page</div>,
    // loader: () => { console.log("loader function is called") },
    // action: async () => { console.log("action function is called") },
    children: [{
      path: "/",
      element: <Login />

    },
    {
      path: "/register",
      element: <Register />
    },
    {
      path: "/profile",
      element:<Profile /> ,
      loader: protectedLoader,
    }

    ],
  }

]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />

)
