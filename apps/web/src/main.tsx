import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@fontsource/metropolis';
import '@fontsource/metropolis/400.css';
import '@fontsource/metropolis/500.css';
import '@fontsource/metropolis/700.css';
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
