import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useLocation,
} from 'react-router-dom'
import HomePage from './HomePage'
import Chat from './Chat'
import Apply from './Apply'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'
import { useState, useEffect } from 'react'

export default function App() {
  const [loggedIn,setLoggedIn] = useState(false)
  useEffect(()=>{
    fetch('http://79.110.62.6:3001/api/visit',{method:'POST'})
  },[])
  const SupportBtn = () => {
    const loc = useLocation()
    if (loc.pathname === '/chat') return null
    return (
      <Link to="/chat" className="support-btn" aria-label="Чат поддержки">
        💬
      </Link>
    )
  }
  return(
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/chat" element={<Chat/>}/>
        <Route path="/apply" element={<Apply/>}/>
        <Route path="/admin" element={<AdminLogin onLogin={()=>setLoggedIn(true)} />}/>
        <Route path="/admin/dashboard" element={loggedIn ? <AdminDashboard/> : <Navigate to="/admin"/>}/>
      </Routes>
      <SupportBtn />
    </Router>
  )
}
