import React, { Component } from 'react'
import logo from './logo.svg'
import './App.styl'

class App extends Component
  render: ->
    pug"""
      .App
        .App-header
          img.App-logo(src=logo, alt="logo")
          p.
            Edit #[code src/App.js] and save to reload.
          a.App-link(
            href='https://reactjs.org'
            target='_blank'
            ref='noopener noreferrer'
          ) Learn React
    """

export default App
