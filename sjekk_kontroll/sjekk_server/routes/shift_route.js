import { Router } from "express";
import { 
    createReport,
    createShift, 
    endShift, 
    getAllShifts,
    getAllTodayShifts, 
    getShiftsByDate, 
    getUserShifts,
    searchLogins, 
} from "../controllers/shift_controller.js";

const router = Router()

router.get('/shifts', getAllShifts)
router.get('/shifts/today/all', getAllTodayShifts)
router.get('/shifts/user/:id', getUserShifts)

router.post('/shifts/search', searchLogins);
router.post('/shifts/report', createReport);

router.get('/shifts/date', getShiftsByDate)


router.post('/shifts', createShift)
router.post('/shifts/:id/submit',endShift)

export default router