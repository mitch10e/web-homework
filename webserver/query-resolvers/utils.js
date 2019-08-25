function packageModel(model) {
  const models = [].concat(model)
  const results = []

  models.forEach(m => {
    if (!m) {
      return true
    }

    const resultObject = m.toObject({ virtuals: true })
  /* Some bad mix of mongoose/express-graphql doesn't map the _id to id (backwards)? */
    // Also protect against bad data that may have been entered in the data base without an id
    if (!resultObject.id, resultObject._id) {
      resultObject.id = resultObject._id.toString()
    }

    results.push(resultObject)
  })

  return results
}

module.exports = {
  packageModel
}
