import { Router } from "express"
import { addSanctionFiles, addSanctionFilesUsingControlNumber, completeSanctionByKidNumber, createSanction, deleteAllSanctionFiles, deleteSanction, deleteSanctionFile, getDeletedSanctions, getSanctionFiles, getSanctions, markSanctionAsPaid, sendSanctionToDebtCollect } from "../controllers/sanction_controller.js"
import multer from "multer"
import Randomstring from "randomstring"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Set the destination folder where files will be saved
        cb(null, 'storage/files/attachments/'); // Create a folder named 'uploads' in your project root
    },
    filename: function (req, file, cb) {
        cb(null,`attachment_${Randomstring.generate(10)}.${file.originalname.split('.').pop()}`);
    }
});

const upload = multer({ storage: storage });
    
const router = Router()

router.post('/sanctions', createSanction)
router.get('/sanctions', getSanctions)
router.get('/sanctions/deleted', getDeletedSanctions)

router.post('/sanctions/:id/payment', markSanctionAsPaid)
router.post('/sanctions/:id/debt-collect', sendSanctionToDebtCollect)



router.delete('/sanctions/:id', deleteSanction)

router.post('/sanctions/control/files',upload.array('attachments[]'),addSanctionFilesUsingControlNumber)
router.post('/sanctions/:id/files',upload.array('attachments[]'),addSanctionFiles)

router.delete('/sanctions/:id/files/:file_id', deleteSanctionFile)
router.delete('/sanctions/:id/files', deleteAllSanctionFiles)
router.get('/sanctions/:id/files', getSanctionFiles)

router.post('/sanctions/kid/:id', completeSanctionByKidNumber)

export default router