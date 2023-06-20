import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import apiStore from './redux/apiStore'
import { Provider } from 'react-redux'
import App from './App'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const PUBLIC_KEY = 'pk_test_51KDaxOHJsNVKrrArFFeZWlXBTm8vGhalFofDPI2LzAQsnSgozyFQO0xFO1eMwWB1Rzg7YfYvBO4G0eOa9owl8h8H00RpVLLMJx'

const stripeTestPromise = loadStripe(PUBLIC_KEY)

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={apiStore}>
          <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
