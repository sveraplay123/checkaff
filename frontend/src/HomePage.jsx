import { Link } from 'react-router-dom'
import './App.css'

const reviews = [
  {name: 'Мария', text: 'Классный конкурс! Очень понравилось!', image: 'https://source.unsplash.com/random/100x100?girl'},
  {name: 'Иван', text: 'Получил море эмоций!', image: 'https://source.unsplash.com/random/100x100?boy'},
  {name: 'Алиса', text: 'Участвую каждый год!', image: 'https://source.unsplash.com/random/100x100?woman'},
]

export default function HomePage() {
  return (
    <div className="container">
      <img className="hero" src="https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?auto=format&fit=crop&w=1200&q=80" alt="stage" />
      <h1>Конкурс талантов</h1>
      <p>Покажи свой талант и получи признание!</p>
      <p>Мы принимаем любые жанры и направления: от вокала и танцев до рисунка и стендапа.</p>
      <div className="actions">
        <Link to="/apply">Подать заявку</Link>
        <Link to="/chat">Чат поддержки</Link>
      </div>
      <h2>Отзывы участников</h2>
      <div className="reviews">
        {reviews.map(r => (
          <div key={r.name} className="review">
            <img src={r.image} alt={r.name} />
            <p><strong>{r.name}</strong></p>
            <p>{r.text}</p>
          </div>
        ))}
      </div>
      <p style={{marginTop:'20px'}}>Финальное шоу состоится 30 июля в городском дворце молодёжи.</p>
    </div>
  )
}
