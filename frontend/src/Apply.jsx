import { useState } from 'react'

export default function Apply() {
  const [form, setForm] = useState({name:'',email:'',talent:'',message:''})
  const handleChange = e => setForm({...form,[e.target.name]:e.target.value})
  const submit = async e => {
    e.preventDefault()
    await fetch('http://localhost:3001/api/applications',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(form)
    })
    alert('Заявка отправлена!')
    setForm({name:'',email:'',talent:'',message:''})
  }
  return (
    <form onSubmit={submit} className="container">
      <h1>Заявка на участие</h1>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Имя" required />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <input name="talent" value={form.talent} onChange={handleChange} placeholder="Ваш талант" required />
      <textarea name="message" value={form.message} onChange={handleChange} placeholder="Доп. информация" />
      <button type="submit">Отправить</button>
    </form>
  )
}
