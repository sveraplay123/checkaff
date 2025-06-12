import { useState, useEffect } from 'react'

export default function Chat() {
  const [user,setUser]=useState({name:'',email:''})
  const [step,setStep]=useState(0)
  const [message,setMessage]=useState('')
  const [messages,setMessages]=useState([])

  const loadChats = async () => {
    const res = await fetch('http://79.110.62.6:3001/api/chat')
    const data = await res.json()
    const chat = data.find(c=>c.name===user.name && c.email===user.email)
    if(chat) setMessages(chat.messages)
  }

  useEffect(()=>{ if(step===1){ loadChats(); const i=setInterval(loadChats,2000); return ()=>clearInterval(i); } },[step])

  const send = async e => {
    e.preventDefault()
    await fetch('http://79.110.62.6:3001/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:user.name,email:user.email,message})})
    setMessage('')
    loadChats()
  }

  if(step===0){
    return(
      <form onSubmit={e=>{e.preventDefault();setStep(1);}} className="container">
        <h1>Чат поддержки</h1>
        <input value={user.name} onChange={e=>setUser({...user,name:e.target.value})} placeholder="Имя" required />
        <input value={user.email} onChange={e=>setUser({...user,email:e.target.value})} placeholder="Email" required />
        <button type="submit">Начать чат</button>
      </form>
    )
  }
  return(
    <div className="container">
      <h1>Чат поддержки</h1>
      <div className="chat-box">
        {messages.map((m,i)=>(
          <div key={i} className={`message ${m.from}`}>{m.text}</div>
        ))}
      </div>
      <form onSubmit={send} className="chat-form">
        <input value={message} onChange={e=>setMessage(e.target.value)} placeholder="Сообщение" />
        <button type="submit">Отправить</button>
      </form>
    </div>
  )
}
