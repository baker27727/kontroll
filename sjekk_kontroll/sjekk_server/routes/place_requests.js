import express from 'express';
import {
    createPlaceRequest,
    getPlaceRequestById,
    getAllPlaceRequests,
    updatePlaceRequestStatus,
    approvePlaceRequest,
    deletePlaceRequest,
    getAllPartnerPlaceRequests
} from '../controllers/place_request_controller.js';

const router = express.Router();

router.post('/place-requests', createPlaceRequest);
router.get('/place-requests/:id', getPlaceRequestById);
router.get('/place-requests', getAllPlaceRequests);
router.get('/place-requests/partner/:id', getAllPartnerPlaceRequests);
router.patch('/place-requests/:id/status', updatePlaceRequestStatus);
router.post('/place-requests/:id/approve', approvePlaceRequest);
router.delete('/place-requests/:id', deletePlaceRequest);

export default router;
