import fs from 'fs'
import glob from 'glob'
import git from 'simple-git'
import prettier from 'prettier'
import { Router } from 'express'
import { list } from '../../node_modules/postcss';

const router = Router()

const getComponents = () => {
  return new Promise((resolve, reject) => {
    glob('./core/**/*.vue', {}, async (er, files) => {
      const allFiles = []

      await files.map(item => {
        const fileName = item.split('/').pop()
        const ext = fileName.split('.')

        allFiles.push({
          path: item,
          fileName: fileName,
          name: ext[0],
          ext: ext[1]
        })
      })

      resolve(allFiles)
    })
  })
}

router.get('/component/map', (req, res) => {
  getComponents().then(allFiles => {
    const listComponents = allFiles.map(item => {
      return `{
        data: ${JSON.stringify(item.name)},
        component: () => import(${JSON.stringify(item.path.replace('./', '~/'))})
      }`
    }).join(',\n')

    const string = `
      /**
       * THIS FILE IS AUTO-GENERATE WHEN
       * BUILDER SAVE COMPONENTS ON CORE FOLDER
       */
      const list = [${listComponents}]

      export default {
        list
      }
    `

    fs.writeFileSync('./lib/components.js', prettier.format(string, { semi: false, singleQuote: true, parser: 'babylon' }))

    res.json({
      success: true,
      data: []
    })
  })
})

router.get('/component', (req, res) => {
  getComponents().then(allFiles => {
    res.json(allFiles)
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

router.post('/component/publish', (req, res) => {
  const { repository, branch } = req.body

  git('./core')
    .add('./*')
    .commit(`Latest commit on branch ${branch} at ${new Date()} `)
    .push(repository, branch, () => {
      res.send({
        success: true,
        repository: repository,
        branch: branch
      })
    })
})

export default router
