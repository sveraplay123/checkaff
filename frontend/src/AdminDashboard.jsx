import { useEffect, useState } from 'react'

export default function AdminDashboard() {
  const [stats,setStats]=useState({visits:0,ips:{}})
  const [apps,setApps]=useState([])
  const [chats,setChats]=useState([])
  const [reply,setReply]=useState('')
  const [current,setCurrent]=useState(null)

  const load = async () => {
    const s = await fetch('http://localhost:3001/api/stats').then(r=>r.json())
    const a = await fetch('http://localhost:3001/api/applications').then(r=>r.json())
    const c = await fetch('http://localhost:3001/api/chat').then(r=>r.json())
    setStats(s); setApps(a); setChats(c)
  }
  useEffect(()=>{ load(); },[])

  const sendReply = async e => {
    e.preventDefault()
    if(!current) return
    await fetch('http://localhost:3001/api/adminReply',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:current.name,email:current.email,message:reply})})
    setReply(''); load();
  }

  return(
    <div className="container">
      <h1>Админ панель</h1>
      <section>
        <h2>Статистика</h2>
        <p>Всего посещений: {stats.visits}</p>
        <ul>
          {Object.entries(stats.ips).map(([ip, count]) => (
            <li key={ip}>{ip}: {count}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Заявки</h2>
        <ul>
          {apps.map((a,i)=>(<li key={i}>{a.name} - {a.email} - {a.talent}</li>))}
        </ul>
      </section>
      <section>
        <h2>Чаты поддержки</h2>
        <div className="chat-list">
          {chats.map((c,i)=>(
            <div key={i} onClick={()=>setCurrent(c)} className="chat-item">
              {c.name} ({c.email})
            </div>
          ))}
        </div>
        {current && (
          <div>
            <h3>Чат с {current.name}</h3>
            <div className="chat-box">
              {current.messages.map((m,i)=>(<div key={i}>{m.from}: {m.text}</div>))}
            </div>
            <form onSubmit={sendReply} className="chat-form">
              <input value={reply} onChange={e=>setReply(e.target.value)} placeholder="Сообщение" />
              <button type="submit">Ответить</button>
            </form>
          </div>
        )}
      </section>
    </div>
  )
}
