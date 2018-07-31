import isReachable from 'is-reachable'
import axios from 'axios'
import ping from 'ping'
import yaml from './yaml'

import { Router } from 'express'

const router = Router()

router.get('/clients', (req, res) => {
  yaml.read().then(data => {
    res.json(data)
  })
})

router.post('/clients/status', (req, res) => {
  const { clients } = req.body

  clientsStatus(clients).then(data => {
    res.json(data)
  })
})

router.post('/clients/sync', (req, res) => {
  const { clients } = req.body

  syncAllServer(clients).then(server => {
    console.log('Synchronization complete')
    res.json({
      server: server
    })
  })
})

router.post('/clients/render', (req, res) => {
  const { clients, source } = req.body

  renderAllServer(clients, source).then(result => {
    console.log('Synchronization complete')
    res.json({
      server: result
    })
  })
})

const clientsStatus = async (clients) => {
  const result = []

  await Promise.all(clients.map(async (srv, index) => {
    await isReachable(`${srv.host}:${srv.port}`).then(alive => {
      result[index] = {
        active: alive,
        ...srv
      }
    })
  }))

  return result
}

const syncAllServer = async (clients) => {
  const result = []

  await Promise.all(clients.map(async (server, index) => {
    if (server.host !== null) {
      const clientServer = `${server.host}:${server.port}`
      console.log(`Synchronize server ${clientServer}`)

      await ping.promise.probe(`${clientServer}`).then(async (reachable) => {
        if (reachable) {
          await axios.post(`${clientServer}/core/sync`).then(res => {
            result[index] = {
              active: true,
              server: `${clientServer}`,
              data: res.data
            }
          })
        } else {
          result[index] = {
            active: false,
            server: `${clientServer}`,
            data: []
          }
        }
      })
    }
  }))

  return result
}

const renderAllServer = async (clients, source) => {
  const result = []

  await Promise.all(clients.map(async (server, index) => {
    if (server.host !== null) {
      const clientServer = `${server.host}:${server.port}`
      console.log(`Synchronize server ${clientServer}`)

      await axios.post(`${clientServer}/core/render`, {
        source: source
      }).then(res => {
        result[index] = {
          active: true,
          server: `${clientServer}`,
          data: res.data
        }
      })
    }
  }))

  return result
}

export default router
