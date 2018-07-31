import express from 'express'
import bodyParser from 'body-parser'
import { Nuxt, Builder } from 'nuxt'
import config from '../nuxt.config.js'

import core from './core'
import api from './api'

const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 8000

app.set('port', port)

// Use Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Import API Routes
app.use('/core', core)
app.use('/api', api)

// Import and Set Nuxt.js options
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// Listen the server
app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
