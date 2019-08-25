import React, { Fragment } from 'react'

import MerchantsTable from './merchants-table'

// Data Management
function createMerchant (id, name, email, created, updated) {
  return { id, name, email, created, updated }
}

const merchants = [
  createMerchant(0, 'ABC Company', 'shipping@abc.com', 'created date1', 'updated date3'),
  createMerchant(1, 'XYZ Company', 'shipping@xyz.com', 'created date2', 'updated date2'),
  createMerchant(2, 'MNO Company', 'shipping@mno.com', 'created date3', null)
]

export function Merchants () {
  return (
    <Fragment>
      <MerchantsTable merchants={merchants} />
    </Fragment>
  )
}
