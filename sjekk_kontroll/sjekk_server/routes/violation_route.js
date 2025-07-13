import { Router } from 'express'
import {
    getAllviolations,
    getViolation,
    createViolation,
    deleteViolation,
    deleteAllViolations,
    getAllPlaceviolations,
    addImage,
    getViolationsCount,
    getTicketPreview,
    getViolationByTicketNumber,
} from '../controllers/violation_controller.js'

import multer from 'multer'

// Set up multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Set the destination folder where files will be saved
        cb(null, 'public/images/temp_cars/'); // Create a folder named 'uploads' in your project root
    },
    filename: function (req, file, cb) {
        cb(null,file.originalname);
    }
});

const upload = multer({ storage: storage });

const router = Router()

router.get('/violations', getAllviolations)
router.get('/violations/count', getViolationsCount)
router.get('/violations/place/:id', getAllPlaceviolations)

router.post('/violations/ticket-preview', getTicketPreview)



router.get('/violations/:id', getViolation)
router.get('/violations/number/:id', getViolationByTicketNumber)


router.put('/violations/:id/images',upload.single('image'), addImage)

router.post('/violations',upload.any(),createViolation)
router.delete('/violations/:id', deleteViolation)
router.delete('/violations', deleteAllViolations)


export default router