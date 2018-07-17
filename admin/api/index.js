const express = require('express')

// Create express instnace
const app = express()

// Require API routes
const syncronize = require('./syncronize')
const components = require('./components')

// Import API Routes
app.use(syncronize)
app.use(components)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
