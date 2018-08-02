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

router.post('/page', (req, res) => {
  const { name, path, description, clients } = req.body

  axios.post(`${api.endpoint}/pages`, {
    name: name,
    path: path,
    description: description,
    meta: JSON.stringify({}),
    pages: JSON.stringify({}),
    clients: JSON.stringify(clients),
    published: 0,
    status: 1
  }).then(result => {
    res.json({
      status: 'success',
      source: `${api.endpoint}/pages`,
      pages: result.data
    })
  })
})

router.put('/page', (req, res) => {
  const page = req.body

  axios.put(`${api.endpoint}/pages/${page.id}`, page).then(result => {
    res.json({
      status: 'success',
      source: `${api.endpoint}/pages`,
      pages: result.data
    })
  })
})

router.post('/page/delete', (req, res) => {
  const page = req.body

  axios.delete(`${api.endpoint}/pages/${page.id}`).then(result => {
    res.json({
      status: 'success',
      source: `${api.endpoint}/pages`,
      pages: page
    })
  })
})

export default router
