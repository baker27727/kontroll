import { Router } from "express";
import { createColor, deleteColor, getAllColors } from "../controllers/color_controller.js";

const router = Router();

router.get('/colors', getAllColors)
router.post('/colors', createColor)
router.delete('/colors/:id', deleteColor)

export default router