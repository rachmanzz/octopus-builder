import fs from 'fs'
import glob from 'glob'
import { Router } from 'express'

const router = Router()

/* GET users listing. */
router.get('/components/list', (req, res) => {
  glob('./core/**/*.vue', {}, (er, files) => {
    const allFiles = []

    files.map(item => {
      const fileName = item.split('/').pop()
      const ext = fileName.split('.')

      allFiles.push({
        path: item,
        fileName: fileName,
        name: ext[0],
        ext: ext[1]
      })
    })

    res.json(allFiles)
  })
})

router.post('/components/read', (req, res) => {
  const { path } = req.body

  fs.readFile(path, (err, data) => {
    if (err) {
      res.send(err)
    }

    res.send(data)
  })
})

router.post('/components/write', (req, res) => {
  const { path, string } = req.body

  fs.writeFile(path, string, (err) => {
    if (err) {
      res.json({
        success: false,
        data: err
      })
    }

    res.send({
      success: true,
      data: path
    })
  })
})

export default router
