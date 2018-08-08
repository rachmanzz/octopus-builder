import { Router } from 'express'

import component from './component'
import client from './client'
import page from './page'
import setting from './setting'
import unsplash from './unsplash'

const router = Router()

router.use(component)
router.use(client)
router.use(page)
router.use(setting)
router.use(unsplash)

export default router
