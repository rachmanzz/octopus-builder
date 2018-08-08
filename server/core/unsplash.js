// import Unsplash from 'unsplash-js'
import { Router } from 'express'
// import yaml from './yaml'

const router = Router()
// const unsplash = new Unsplash({
//   applicationId: yaml.access,
//   secret: yaml.secret,
//   callbackUrl: yaml.callback,
//   bearerToken: yaml.token
// })

router.get('/photos', (req, res) => {
  // unsplash.photos.listPhotos(1, 15, 'latest').then(data => {
  res.json({})
  // })
})

export default router
