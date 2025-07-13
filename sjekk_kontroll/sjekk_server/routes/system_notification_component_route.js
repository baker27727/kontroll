import multer from "multer";
import { Router } from "express";
import { getAllSystemNotificationComponents, sendNotificationComponent, storeSystemNotificationComponent } from "../controllers/system_notification_component_controller.js";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/notifications-uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Only JPEG and PNG files are accepted'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

const router = Router();

router.get('/system-notification-components', getAllSystemNotificationComponents)
router.post('/system-notification-components', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'icon', maxCount: 1 }]), storeSystemNotificationComponent)

router.post('/system-notification-components/:id/send', sendNotificationComponent)


export default router
