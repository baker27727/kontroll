import { Router } from "express"
import { createComplaint, deleteComplaint, getAllComplaints, getComplaint, getComplaintsCount, performActionOnComplaint as performActionOnComplaint } from "../controllers/complaint_controller.js"

import multer from 'multer'

// Set up multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if(file.mimetype == 'application/pdf'){
            cb(null, 'public/files/complaints/')
        }else{
            cb(null, 'public/images/complaints/'); // Create a folder named 'uploads' in your project root
        }
    },
    filename: function (req, file, cb) {
        // Customize the filename here
        const originalname = file.originalname;
        const sanitizedFilename = originalname.replace(/\s|'/g, '');
        cb(null, sanitizedFilename);
    }
});

const upload = multer({ storage: storage });

const router = Router()

router.post('/complaints',upload.any(), createComplaint)
router.get('/complaints', getAllComplaints)
router.get('/complaints/count', getComplaintsCount)
router.get('/complaints/pending/count', getComplaintsCount)
router.get('/complaints/rejected/count', getComplaintsCount)
router.get('/complaints/completed/count', getComplaintsCount)
router.get('/complaints/:id', getComplaint)
router.post('/complaints/:id/action', performActionOnComplaint)
router.delete('/complaints/:id', deleteComplaint)
export default router