const express = require('express')

// Create express instnace
const app = express()

// Require API routes
const syncronize = require('./syncronize')

// Import API Routes
app.use(syncronize)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
