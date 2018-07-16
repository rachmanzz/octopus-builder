const express = require('express')

// Create express instnace
const app = express()

// Require API routes
const receiver = require('./receiver')

// Import API Routes
app.use(receiver)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
