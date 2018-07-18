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

/* GET users listing. */
router.post('/sync', (req, res) => {
  console.log('Trigger server 8010 & 8020 to synchronization new components')
  syncAllServer(['8010', '8020']).then(server => {

    console.log('Synchronization complete')
    res.json({
      server: server
    })
  })
})

export default router
