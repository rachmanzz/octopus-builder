import { Router } from 'express'

import component from './component'
import client from './client'
import page from './page'
import setting from './setting'
import pixabay from './pixabay'

const router = Router()

router.use(component)
router.use(client)
router.use(page)
router.use(setting)
router.use(pixabay)

export default router
