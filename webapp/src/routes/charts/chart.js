import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { Bar, Pie, Polar } from 'react-chartjs-2'
import { useTranslation } from 'react-i18next'

export default function Chart (props) {
  const { t } = useTranslation()
  const { chart, filter, merchants, transactions, users } = props

  // https://stackoverflow.com/questions/1484506/random-color-generator
  function getRandomColor () {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  const getAvailableDates = () => {
    var result = []
    transactions.forEach((transaction, index) => {
      if (result.indexOf(transaction.date.slice(0, 10)) === -1) {
        result.push(transaction.date.slice(0, 10))
      }
    })
    return result
  }

  const getAvailableMerchants = () => {
    var result = []
    transactions.forEach((transaction, index) => {
      const merchant = merchants.find(merchant => merchant.id === transaction.merchant_id)
      const found = result.some(merchant => merchant.id === transaction.merchant_id)
      if (!found) {
        result.push(merchant)
      }
    })
    return result
  }

  const getAvailableUsers = () => {
    var result = []
    transactions.forEach((transaction, index) => {
      const user = users.find(user => user.id === transaction.user_id)
      const found = result.some(user => user.id === transaction.user_id)
      if (!found) {
        result.push(user)
      }
    })
    return result
  }

  const buildDateFilteredData = () => {
    const dates = getAvailableDates()
    var data = []
    dates.forEach((date, index) => {
      var count = transactions.reduce((n, transaction) => {
        return n + (transaction.date.slice(0, 10) === date)
      }, 0)

      data.push(count)
    })

    return buildChartData([], data, dates)
  }

  const buildMerchantFilteredData = () => {
    const merchantsUsed = getAvailableMerchants()
    var data = []
    merchantsUsed.forEach((merchant, index) => {
      var count = transactions.reduce((n, transaction) => {
        return n + (transaction.merchant_id === merchant.id)
      }, 0)

      data.push(count)
    })

    return buildChartData([], data, merchantsUsed.map((merchant) => {
      return merchant.name
    }))
  }

  const buildUserFilteredData = () => {
    const usersUsed = getAvailableUsers()
    var data = []
    usersUsed.forEach((user, index) => {
      var count = transactions.reduce((n, transaction) => {
        return n + (transaction.user_id === user.id)
      }, 0)

      data.push(count)
    })

    return buildChartData([], data, usersUsed.map((user) => {
      return user.name
    }))
  }

  const buildChartData = (colors, data, labels) => {
    var displayColors = colors
    if (colors.length === 0) {
      for (var i = 0; i < labels.length; i++) {
        displayColors.push(getRandomColor())
      }
    }
    return {
      datasets: [{
        backgroundColor: displayColors,
        data: data,
        label: t('transactionData')
      }],
      labels: labels
    }
  }

  const displayData = () => {
    if (filter === t('date')) {
      return buildDateFilteredData()
    }
    if (filter === t('merchant')) {
      return buildMerchantFilteredData()
    }
    if (filter === t('user')) {
      return buildUserFilteredData()
    }
    return {}
  }

  return (
    <Fragment>
      {chart === t('bar') ? (
        <Bar data={displayData} options={{
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }} />
      ) : null}
      {chart === t('pie') ? (
        <Pie data={displayData} />
      ) : null}
      {chart === t('polar') ? (
        <Polar data={displayData} />
      ) : null}
    </Fragment>
  )
}

Chart.propTypes = {
  chart: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired,
  merchants: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired,
  transactions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    user_id: PropTypes.string.isRequired,
    merchant_id: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    tax: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    credit: PropTypes.bool.isRequired,
    debit: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired).isRequired
}
