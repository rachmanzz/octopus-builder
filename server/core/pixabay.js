import { authenticate } from 'pixabay-api'
import { Router } from 'express'
import path from 'path'
import yaml from 'read-yaml'

const file = path.resolve('./octopus.yaml')
const config = yaml.sync(file)
const router = Router()
const { searchImages } = authenticate(config.pixabay['key'])

router.get('/photos', (req, res) => {
  searchImages('birthday cake', {per_page: 20}).then(data => {
    res.json(data)
  })
})

export default router
