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
      <h1>Конкурс талантов</h1>
      <p>Покажи свой талант и получи признание!</p>
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
    </div>
  )
}
