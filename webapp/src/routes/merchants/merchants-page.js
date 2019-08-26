import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import MerchantsTable from './merchants-table'

export function Merchants () {
  const [merchants, setMerchants] = React.useState([])

  const handleMerchantsLoaded = (data) => {
    setMerchants(data.merchants)
  }

  return (
    <Fragment>
      <Query query={gql`query GetMerchants {
      merchants {
        id
        name
        email
      }
    }`
      }>
        {({ loading, error, data }) => {
          if (loading) { return <span /> }
          if (error) { return <p>ERROR</p> }

          handleMerchantsLoaded(data)
          return (
            <MerchantsTable merchants={merchants} />
          )
        }}
      </Query>
    </Fragment>
  )
}
