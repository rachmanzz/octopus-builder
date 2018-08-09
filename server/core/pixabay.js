import { authenticate } from 'pixabay-api'
import { Router } from 'express'
import path from 'path'
import yaml from 'read-yaml'

const file = path.resolve('./octopus.yaml')
const config = yaml.sync(file)
const router = Router()
const { searchImages } = authenticate(config.pixabay['key'])

router.post('/photos', (req, res) => {
  const { query, category, limit } = req.body

  searchImages(query, {
    per_page: limit || 20,
    category: category,
    safesearch: false
  }).then(data => {
    res.json(data)
  })
})

export default router
