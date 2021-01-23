import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-datepicker/dist/react-datepicker.css'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck, faChevronRight, faPlus, faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faEdit as farEdit } from '@fortawesome/free-regular-svg-icons'

library.add(faCheck, faChevronRight, farEdit, faPlus, faSpinner, faTimes)

require('./i18n')

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
