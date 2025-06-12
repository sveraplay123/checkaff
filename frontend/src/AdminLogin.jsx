import { useState } from 'react'

export default function AdminLogin({onLogin}) {
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const login=async e=>{
    e.preventDefault()
    const res=await fetch('http://localhost:3001/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username,password})})
    if(res.ok){ onLogin(); } else { alert('Неверные данные') }
  }
  return(
    <form onSubmit={login} className="container">
      <h1>Вход администратора</h1>
      <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Логин" />
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Пароль" />
      <button type="submit">Войти</button>
    </form>
  )
}
