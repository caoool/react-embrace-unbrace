import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.coffee'

it 'renders without crashing', =>
  div = document.createElement 'div'
  ReactDOM.render <App />, div
  ReactDOM.unmountComponentAtNode div