import { Router } from 'express'

import hello from './hello'

const router = Router()

router.use(hello)

export default router
