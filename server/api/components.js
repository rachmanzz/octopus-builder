import fs from 'fs'
import glob from 'glob'
import rm from 'rimraf'
import git from 'simple-git'
import prettier from 'prettier'
import { Router } from 'express'

const router = Router()

const getComponents = () => {
  return new Promise((resolve, reject) => {
    glob('./core/**/*.vue', {}, async (er, files) => {
      const allFiles = []

      await files.map(item => {
        const name = item.split('/').pop()
        const file = name.split('.')

        allFiles.push({
          path: item,
          file: name,
          name: file[0],
          type: file[1]
        })
      })

      resolve(allFiles)
    })
  })
}
router.get('/component', (req, res) => {
  getComponents().then(allFiles => {
    git('./core').status((err, gitFilter) => {
      if (err) {
        throw new Error(err)
      }

      const gitFilterParam = ['not_added', 'conflicted', 'created', 'deleted', 'modified', 'renamed']

      gitFilterParam.map(item => {
        const filteredFile = gitFilter[item]

        allFiles.map(file => {
          if (filteredFile.indexOf(file.path.replace('./core/', '')) > -1) {
            file['status'] = item
          }
        })
      })

      res.json(allFiles)
    })
  })
})

router.post('/component', (req, res) => {
  const { path } = req.body

  fs.readFile(path, (err, data) => {
    if (err) {
      res.send(err)
    }

    res.send(data)
  })
})

router.put('/component', (req, res) => {
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

router.post('/component/create', (req, res) => {
  const { fileName, filePath } = req.body
  const path = `./core${filePath}`
  const file = `./core${filePath + fileName}.vue`

  if (!fs.existsSync(path)) {
    fs.mkdirSync(path)
  }

  fs.writeFile(file, `<template>\n<section>\n<!-- Do Stuff -->\n</section>\n</template>`, (err) => {
    if (err) {
      res.json({
        success: false,
        data: err
      })
    }

    res.send({
      success: true,
      data: file
    })
  })
})

router.post('/component/remove', (req, res) => {
  const { filePath } = req.body

  rm(filePath, (err) => {
    if (err) {
      res.json({
        success: false,
        data: err
      })
    }

    res.send({
      success: true,
      data: filePath
    })
  })
})

router.post('/component/publish', (req, res) => {
  const { repository, branch, file } = req.body
  const source = file ? file['path'].replace('/core', '') : './*'
  const message = file
    ? `Commit file ${file['file']} on branch ${branch} at ${new Date()} `
    : `Latest commit on branch ${branch} at ${new Date()} `

  git('./core')
    .add(source)
    .commit(message)
    .push(repository, branch, () => {
      res.send({
        success: true,
        repository: repository,
        branch: branch
      })
    })
})

router.get('/component/status', (req, res) => {
  git('./core').status((err, status) => {
    if (err) throw new Error(err)
    res.json(status)
  })
})

router.get('/component/map', (req, res) => {
  getComponents().then(allFiles => {
    const listComponents = allFiles.map(item => {
      return `{
        name: ${JSON.stringify(item.name)},
        icon: 'far fa-image',
        component: () => import(${JSON.stringify(item.path.replace('./', '~/'))})
      }`
    }).join(',\n')

    const string = `
      /**
       * THIS FILE IS AUTO-GENERATE WHEN
       * BUTTON REFRESH ON BUILDER CLICKED
       */
      const listComponents = [${listComponents}]
      export default listComponents
    `

    fs.writeFileSync('./lib/studioImporter.js', prettier.format(string, {
      semi: false,
      singleQuote: true,
      parser: 'babylon'
    }))

    res.json({
      success: true,
      data: []
    })
  })
})

export default router
