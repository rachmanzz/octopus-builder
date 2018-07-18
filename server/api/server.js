import fs from 'fs'
import path from 'path'
import isReachable from 'is-reachable'

import { Router } from 'express'

const router = Router()

const serverStatus = async (server) => {
  const result = []

  await Promise.all(server.map(async (srv, index) => {
    await isReachable(`http://${srv.host}:${srv.port}`).then(async (reachable) => {
      if (reachable) {
        result[index] = {
          active: true,
          server: `http://${srv.host}:${srv.port}`
        }
      } else {
        result[index] = {
          active: false,
          server: `http://${srv.host}:${srv.port}`
        }
      }
    })
  }))

  return result
}

/* GET users listing. */
router.get('/server', (req, res) => {
  fs.readFile(path.resolve('./config.json'), (e, data) => {
    res.json(JSON.parse(data.toString()))
  })
})

router.post('/server/status', (req, res) => {
  const { server } = req.body

  serverStatus(server).then(data => {
    res.json(data)
  })
})

export default router
