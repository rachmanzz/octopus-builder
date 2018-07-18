import { Router } from 'express'

import components from './components'
import syncronize from './syncronize'
import server from './server'

const router = Router()

router.use(components)
router.use(syncronize)
router.use(server)

export default router
