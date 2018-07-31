import { Router } from 'express'
import yaml from './yaml'

const router = Router()

router.get('/setting', (req, res) => {
  yaml.read().then(data => {
    res.json(data)
  })
})

router.post('/setting', (req, res) => {
  const content = req.body

  if (!content.repository || content.clients.length === 0) {
    res.json({
      success: false,
      data: 'Please send valid JSON of config'
    })
  } else {
    yaml.write(content).then(data => {
      res.json(data)
    })
  }
})

export default router
