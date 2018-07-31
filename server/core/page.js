import { Router } from 'express'
import path from 'path'
import readYaml from 'read-yaml'
import axios from 'axios'

const { api } = readYaml.sync(path.resolve('./octopus.yaml'))
const router = Router()

router.get('/page', (req, res) => {
  axios.get(`${api.endpoint}/pages`).then(result => {
    res.json({
      source: `${api.endpoint}/pages`,
      pages: result.data
    })
  })
})

export default router
