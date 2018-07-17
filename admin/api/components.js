const fs = require('fs')
const path = require('path')
const glob = require('glob')
const { Router } = require('express')

const router = Router()

/* GET users listing. */
const allFilesSync = (dir, type = '', fileList = []) => {
  fs.readdirSync(dir).forEach(file => {
    if (file === '.git') return

    const filePath = path.join(dir, file)

    fileList.push(
      fs.statSync(filePath).isDirectory()
        ? { [file]: allFilesSync(filePath, type) }
        : file
    )
  })

  return fileList
}

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

module.exports = router
