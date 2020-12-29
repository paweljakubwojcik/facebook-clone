import React from 'react';
import ReactDOM from 'react-dom';
import Apollo from './Apollo'
import reportWebVitals from './reportWebVitals';

import { AuthProvider } from './Context/auth'
import App from './App';

ReactDOM.render(

  <Apollo >
    <AuthProvider>
      <App />
    </AuthProvider>
  </Apollo>

  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
