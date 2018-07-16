const { Router } = require('express')
const exec = require('child_process').exec
const router = Router()

router.post('/sync', (req, res) => {
  console.log('Removing folder components at server 8010')
  exec('rm -rf components', (e, stdout, stderr) => {
    if (e instanceof Error) {
      console.error(e)
    }

    console.log('Clone new components at server 8010')
    exec('git clone https://github.com/muhibbudins/auto-sync-repo.git components', (e, stdout, stderr) => {
      if (e instanceof Error) {
        console.error(e)
      }

      console.log('Synchronization complete at server 8010')
      res.send({
        success: true,
        process: 'done'
      })
    })
  })
})

module.exports = router
