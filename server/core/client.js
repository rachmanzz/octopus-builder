import isReachable from 'is-reachable'
import axios from 'axios'
import yaml from './yaml'

import { Router } from 'express'

const router = Router()

router.get('/client', (req, res) => {
  yaml.read().then(data => {
    res.json(data)
  })
})

router.post('/client/status', (req, res) => {
  const { clients } = req.body

  clientsStatus(clients).then(data => {
    res.json(data)
  })
})

router.post('/client/render', (req, res) => {
  const { clients, sources } = req.body
  renderAllServer(clients, sources).then(result => {
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

const renderAllServer = async (clients, sources) => {
  const result = []
  await Promise.all(clients.map(async (server, index) => {
    if (server.host !== null) {
      const clientServer = `${server.host}:${server.port}`

      console.log(`Synchronize server ${clientServer}`)

      await axios.post(`${clientServer}/api/render`, {
        sources: sources
      }).then(res => {
        result[index] = {
          server: `${clientServer}`,
          ...res.data
        }
      })
    }
  }))

  return result
}

export default router
