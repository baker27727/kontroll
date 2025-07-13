import { Router } from 'express'
import { 
    createCarFromPlaceDashboard,
    createPlace, 
    createPlaceDashboard, 
    deleteAllPlaces, 
    deletePlace, 
    deletePlaceDashboard, 
    getAllCarsRegisteredByPlaceDashboard, 
    getAllPlaceDashboards, 
    getAllPlaces, 
    getPlace, 
    getPlacesCount, 
    updatePlace 
} from "../controllers/place_controller.js"
import { getAllPlaceviolations } from '../controllers/violation_controller.js';
import asyncWrapper from '../middlewares/async_wrapper.js';
import PrismaClientService from '../utils/prisma_client.js';

const router = Router();

router.get('/places', getAllPlaces)
router.get('/places/count', getPlacesCount)
router.get('/places/:id', getPlace)


router.post('/places', createPlace)
router.post('/places/:id/dashboards', createPlaceDashboard)
router.get('/places/:id/dashboards', getAllPlaceDashboards)
router.post('/places/dashboards/:id/cars', createCarFromPlaceDashboard)
router.get('/places/dashboards/:id/cars', getAllCarsRegisteredByPlaceDashboard)

router.delete('/places/:id/dashboards/:dashboard_id', deletePlaceDashboard)
router.delete('/places/:id', deletePlace)
router.delete('/places', deleteAllPlaces)

router.put('/places/:id', updatePlace)


router.get('/places/:id/violations', getAllPlaceviolations)

router.get('/public-places/:id/notifications', asyncWrapper(
    async (req, res) => {
        const { id } = req.params
        const prisma = PrismaClientService.instance
        const notifications = await prisma.notification.findMany({
            where: {
                channel: 'public_place',
                channel_member_id: +id
            }
        })
        res.status(200).json(notifications)
    }
))

export default router