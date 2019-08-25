// Merchants
export function createMerchant (id, name, email, created, updated) {
  return { id, name, email, created, updated }
}

export const merchants = [
  createMerchant(0, 'ABC Company', 'shipping@abc.com', 'created date1', 'updated date3'),
  createMerchant(1, 'XYZ Company', 'shipping@xyz.com', 'created date2', 'updated date2'),
  createMerchant(2, 'MNO Company', 'shipping@mno.com', 'created date3', null)
]

// Transactions
export function createTransaction (id, user, merchant, cost, tax, date) {
  return { id, user, merchant, cost, tax, date }
}

export const transactions = [
  createTransaction(10, 0, 0, 3.00, 0.14, '05/24/2019'),
  createTransaction(12, 0, 1, 4.00, 0.18, '05/25/2019'),
  createTransaction(23, 1, 2, 5.00, 0.16, '05/26/2019'),
  createTransaction(39, 1, 0, 15.00, 0.14, '05/23/2019')
]

// Users
export function createUser (id, name, email, created, updated) {
  return { id, name, email, created, updated }
}

export const users = [
  createUser(0, 'John Doe', 'john@doe.com', 'created date', 'updated date3'),
  createUser(1, 'Jane Doe', 'jane@doe.com', 'created date2', 'updated date2')
]
