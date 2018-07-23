import { Router } from 'express'
import axios from 'axios'
import isReachable from 'is-reachable'

const router = Router()

const syncAllServer = async (ports) => {
  const result = []

  await Promise.all(ports.map(async (port, index) => {
    console.log(`Synchronize server ${port}`)

    await isReachable(`http://localhost:${port}`).then(async (reachable) => {
      if (reachable) {
        await axios.post(`http://localhost:${port}/api/sync`).then(res => {
          result[index] = {
            active: true,
            server: `http://localhost:${port}`,
            data: res.data
          }
        })
      } else {
        result[index] = {
          active: false,
          server: `http://localhost:${port}`,
          data: []
        }
      }
    })
  }))

  return result
}

const renderAllServer = async (ports, source) => {
  const result = []

  await Promise.all(ports.map(async (port, index) => {
    console.log(`Synchronize server ${port}`)

    await axios.post(`http://localhost:${port}/api/render`, {
      source: source
    }).then(res => {
      result[index] = {
        active: true,
        server: `http://localhost:${port}`,
        data: res.data
      }
    })
  }))

  return result
}

/* GET users listing. */
router.post('/synchronize', (req, res) => {
  const { clients } = req.body
  const port = clients.map(item => item.port)

  syncAllServer(port).then(server => {
    console.log('Synchronization complete')
    res.json({
      server: server
    })
  })
})

router.post('/render', (req, res) => {
  const source = req.body

  renderAllServer([8010], source).then(result => {
    console.log('Synchronization complete')
    res.json({
      server: result
    })
  })
})

export default router
