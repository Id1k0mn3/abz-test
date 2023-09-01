import ReactDOM from 'react-dom/client'
import { HomePage } from './pages/HomePage'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <div className="root-app">
    <HomePage />
  </div>
)
