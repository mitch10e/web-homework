import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { Polar } from 'react-chartjs-2'

// const data = {
//   datasets: [{
//     data: [
//       11,
//       16,
//       7,
//       3,
//       14
//     ],
//     backgroundColor: [
//       '#FF6384',
//       '#4BC0C0',
//       '#FFCE56',
//       '#E7E9ED',
//       '#36A2EB'
//     ],
//     label: 'My dataset' // for legend
//   }],
//   labels: [
//     'Red',
//     'Green',
//     'Yellow',
//     'Grey',
//     'Blue'
//   ]
// }

export default function Chart (props) {
  const { filter, merchants, transactions, users } = props

  const getAvailableDates = () => {
    var result = []
    transactions.forEach((transaction, index) => {
      if (result.indexOf(transaction.date) === -1) {
        result.push(transaction.date)
      }
    })
    return result
  }

  const getAvailableMerchants = () => {
    var result = []
    transactions.forEach((transaction, index) => {
      if (!result.find(merchant => merchant.id === transaction.merchant_id)) {
        result.push(merchant)
      }
    })
    return result
  }

  const getAvailableUsers = () => {
    var result = []
    transactions.forEach((transaction, index) => {
      if (!result.find(user => user.id === transaction.user_id)) {
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
        return n + (transaction.date === date)
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

    return buildChartData([], data, merchantsUsed)
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

    return buildChartData([], data, usersUsed)
  }

  const buildChartData = (colors, data, labels) => {
    return {
      datasets: [{
        backgroundColor: colors,
        data: data,
        label: 'Transaction Data'
      }],
      labels: labels
    }
  }

  const displayData = () => {
    if (filter === 'Date') {
      return buildDateFilteredData()
    }
    if (filter === 'Merchant') {
      return buildMerchantFilteredData()
    }
    if (filter === 'User') {
      return buildUserFilteredData()
    }
    return {}
  }

  return (
    <Fragment>
      <Polar data={displayData} />
    </Fragment>
  )
}

Chart.propTypes = {
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
