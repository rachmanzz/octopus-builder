import { Router } from 'express'

import component from './component'
import clients from './clients'
import setting from './setting'

const router = Router()

router.use(component)
router.use(clients)
router.use(setting)

export default router
