import React, { Fragment } from 'react'

import MerchantsTable from './merchants-table'
import { merchants } from './../../network/mock-client'

export function Merchants () {
  return (
    <Fragment>
      <MerchantsTable merchants={merchants} />
    </Fragment>
  )
}
