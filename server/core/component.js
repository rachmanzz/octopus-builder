import fs from 'fs'
import rm from 'rimraf'
import glob from 'glob'
import axios from 'axios'
import git from 'simple-git'
import prettier from 'prettier'
import fx from 'mkdir-recursive'
import isReachable from 'is-reachable'
import { Router } from 'express'

const router = Router()

router.get('/component', (req, res) => {
  getComponents().then(allFiles => {
    git('./share').status((err, gitFilter) => {
      if (err) {
        throw new Error(err)
      }

      const gitFilterParam = ['not_added', 'conflicted', 'created', 'deleted', 'modified', 'renamed']

      gitFilterParam.map(item => {
        const filteredFile = gitFilter[item]

        allFiles.map(file => {
          if (filteredFile.indexOf(file.path.replace('./share/', '')) > -1) {
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
  const { name, path } = req.body
  const dest = `./share${path}`
  const file = `./share${path + '/' + name}.vue`

  if (!fs.existsSync(dest)) {
    fx.mkdirSync(dest)
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
  const { repository, branch, file, clients } = req.body
  const source = file ? file['path'].replace('/share', '') : './*'
  const message = file
    ? `Commit file ${file['file']} on branch ${branch} at ${new Date()} `
    : `Latest commit on branch ${branch} at ${new Date()} `

  git('./share')
    .add(source)
    .commit(message)
    .push(repository, branch, () => {
      syncAllServer(clients).then(server => {
        console.log('Synchronization complete')
        res.send({
          success: true,
          repository: repository,
          server: clients,
          branch: branch
        })
      })
    })
})

router.get('/component/status', (req, res) => {
  git('./share').status((err, status) => {
    if (err) throw new Error(err)
    res.json(status)
  })
})

router.get('/component/source', (req, res) => {
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

    fs.writeFileSync('./server/studio/source.js', prettier.format(string, {
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

const getComponents = () => {
  return new Promise((resolve, reject) => {
    glob('./share/**/*.vue', {}, async (er, files) => {
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

const syncAllServer = async (clients) => {
  const result = []

  await Promise.all(clients.map(async (server, index) => {
    if (server.host !== null) {
      const clientServer = `${server.host}:${server.port}`
      console.log(`Synchronize server ${clientServer}`)

      await isReachable(`${clientServer}`).then(async (reachable) => {
        if (reachable) {
          await axios.post(`${clientServer}/api/sync`).then(res => {
            result[index] = {
              active: true,
              server: `${clientServer}`,
              data: res.data
            }
          })
        } else {
          result[index] = {
            active: false,
            server: `${clientServer}`,
            data: []
          }
        }
      })
    }
  }))

  return result
}

export default router
