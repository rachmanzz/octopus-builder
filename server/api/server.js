import isReachable from 'is-reachable'
import config from '../lib/config'

import { Router } from 'express'

const router = Router()

const serverStatus = async (server) => {
  const result = []

  await Promise.all(server.map(async (srv, index) => {
    await isReachable(`${srv.host}:${srv.port}`).then(alive => {
      result[index] = {
        active: alive,
        ...srv
      }
    })
  }))

  return result
}

router.get('/server', (req, res) => {
  config.read().then(data => {
    res.json(data)
  })
})

router.post('/server/status', (req, res) => {
  const { server } = req.body

  serverStatus(server).then(data => {
    res.json(data)
  })
})

export default router
