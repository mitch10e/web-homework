import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './routes'
import { ApolloProvider } from 'react-apollo'
import { client } from './network/apollo-client'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Translation - i18n
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        'add': 'Add',
        'bar': 'Bar',
        'addNew': 'Add New',
        'charts': 'Charts',
        'chartType': 'Chart Type',
        'date': 'Date',
        'delete': 'Delete',
        'deleteSelected': 'Delete the selected',
        'filter': 'Filter',
        'merchant': 'Merchant',
        'merchants': 'Merchants',
        'pie': 'Pie',
        'polar': 'Polar',
        'selected': 'selected',
        'settings': 'Settings',
        'title': 'Mitchell Tenney - Homework',
        'transactions': 'Transactions',
        'transactionData': 'Transaction Data',
        'user': 'User',
        'users': 'Users'
      }
    },
    true: {
      translation: {
        'add': 'Add'.split('').reverse().join(''),
        'bar': 'Bar'.split('').reverse().join(''),
        'addNew': 'Add New'.split('').reverse().join(''),
        'charts': 'Charts'.split('').reverse().join(''),
        'chartType': 'Chart Type'.split('').reverse().join(''),
        'date': 'Date'.split('').reverse().join(''),
        'delete': 'Delete'.split('').reverse().join(''),
        'deleteSelected': 'Delete the selected'.split('').reverse().join(''),
        'filter': 'Filter'.split('').reverse().join(''),
        'merchant': 'Merchant'.split('').reverse().join(''),
        'merchants': 'Merchants'.split('').reverse().join(''),
        'pie': 'Pie'.split('').reverse().join(''),
        'polar': 'Polar'.split('').reverse().join(''),
        'selected': 'selected'.split('').reverse().join(''),
        'settings': 'Settings'.split('').reverse().join(''),
        'title': 'Mitchell Tenney - Homework'.split('').reverse().join(''),
        'transactions': 'Transactions'.split('').reverse().join(''),
        'transactionData': 'Transaction Data'.split('').reverse().join(''),
        'user': 'User'.split('').reverse().join(''),
        'users': 'Users'.split('').reverse().join('')
      }
    }
  },
  lng: new URLSearchParams(window.location.search).get('i18n'),
  fallbackLng: 'en'
})

ReactDOM.render(
  (
    <div data-app-init=''>
      <ApolloProvider client={client}>
        <AppRouter />
      </ApolloProvider>
    </div>
  ),
  document.getElementById('react-app')
)
