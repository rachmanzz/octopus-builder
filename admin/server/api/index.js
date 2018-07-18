import { Router } from 'express'

import components from './components'
import syncronize from './syncronize'

const router = Router()

router.use(components)
router.use(syncronize)

export default router
