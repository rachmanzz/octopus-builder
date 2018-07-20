import { Router } from 'express'
import config from '../lib/config'

const router = Router()

/* GET users listing. */
router.get('/settings', (req, res) => {
  config.read().then(data => {
    res.json(data)
  })
})

router.post('/settings', (req, res) => {
  const content = req.body

  if (!content.repository || content.clients.length === 0) {
    res.json({
      success: false,
      data: 'Please send valid JSON of config'
    })
  } else {
    config.write(content).then(data => {
      res.json(data)
    })
  }
})

export default router
