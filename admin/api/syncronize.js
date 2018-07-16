const { Router } = require('express')
const axios = require('axios')

const router = Router()

const syncAllServer = async (ports) => {
  const result = []

  await Promise.all(ports.map(async (port, index) => {
    console.log(`Synchronize server ${port}`)
    await axios.post(`http://localhost:${port}/api/sync`).then(res => {
      result[index] = res.data
    })
  }))

  return result
}

/* GET users listing. */
router.post('/sync', (req, res, next) => {
  console.log('Trigger server 8010 & 8020 to synchronization new components')
  syncAllServer(['8010', '8020']).then(server => {

    console.log('Synchronization complete')
    res.json({
      success: true,
      server: server
    })
  })
})

module.exports = router
