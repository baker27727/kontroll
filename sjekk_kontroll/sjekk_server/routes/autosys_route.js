import { Router } from "express";
import getPlateInformation from "../controllers/autosys_controller.js";

const router = Router()

router.get('/autosys/:id', getPlateInformation)

export default router