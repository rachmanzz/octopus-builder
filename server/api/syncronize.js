import { Router } from 'express'
import axios from 'axios'
import ping from 'ping'

const router = Router()

const syncAllServer = async (clients) => {
  const result = []

  await Promise.all(clients.map(async (server, index) => {
    if (server.host !== null) {
      const clientServer = `${server.host}:${server.port}`
      console.log(`Synchronize server ${clientServer}`)

      await ping.promise.probe(`${clientServer}`).then(async (reachable) => {
        if (reachable) {
          await axios.post(`${clientServer}/api/sync`).then(res => {
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

      await axios.post(`${clientServer}/api/render`, {
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

/* GET users listing. */
router.post('/synchronize', (req, res) => {
  const { clients } = req.body

  syncAllServer(clients).then(server => {
    console.log('Synchronization complete')
    res.json({
      server: server
    })
  })
})

router.post('/render', (req, res) => {
  const { clients, source } = req.body

  renderAllServer(clients, source).then(result => {
    console.log('Synchronization complete')
    res.json({
      server: result
    })
  })
})

export default router
