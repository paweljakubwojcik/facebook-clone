import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import Apollo from './Apollo'
import reportWebVitals from './reportWebVitals';

import { AuthProvider } from './Context/auth'
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Apollo >
      <AuthProvider>
        <App />
      </AuthProvider>
    </Apollo>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
