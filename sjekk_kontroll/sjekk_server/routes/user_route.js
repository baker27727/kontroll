import { Router } from 'express'
import { deleteAllUsers, deleteUser, getAllDeletedUsers, getAllUsers, getUser, getUsersCount, createUser, updateUser } from "../controllers/user_controller.js"
import { getAllUserViolations } from '../controllers/violation_controller.js'

const router = Router()

router.get('/users', getAllUsers)
router.get('/users/deleted', getAllDeletedUsers)

router.get('/users/count', getUsersCount)
router.get('/users/:id', getUser)

router.put('/users/:id', updateUser)

router.post('/users/register', createUser)
router.delete('/users/:id', deleteUser)
router.delete('/users', deleteAllUsers)


router.get('/users/:id/violations', getAllUserViolations)

export default router