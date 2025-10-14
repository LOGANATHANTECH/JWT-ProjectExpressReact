import React from 'react'
import Login from './page/login.jsx'
import Register from './page/register.jsx'
import {Outlet} from 'react-router-dom'
function App() {
  

  return (
 
      <div> 
        <Outlet/>
      </div>
  )
}

export default App
