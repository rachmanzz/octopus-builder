import { Router } from 'express'

import components from './components'
import syncronize from './syncronize'
import server from './server'
import settings from './settings'

const router = Router()

router.use(components)
router.use(syncronize)
router.use(server)
router.use(settings)

export default router
