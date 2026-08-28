import { Router } from 'express'
import { addLog, cappedLogs } from './log.service.js'
import { successResponse } from '../../common/utils/success.response.js'
const router = Router()


router.post('/capped',async (req, res, next) => {
    const data = await cappedLogs(req.body)
    return successResponse({res , message:"logs is capped successfuly",data , status:200})
})
router.post('/',async (req, res, next) => {
    const data = await addLog(req.body)
    return successResponse({res , message:"logs added successfuly",data , status:200})
})

export default router