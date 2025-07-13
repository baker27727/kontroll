import { Router } from "express";
import { 
    createRule,
    deleteAllRules,
    deleteRule,
    getAllRules,
    getRule, 
    getRulesCount, 
    updateRule
} from "../controllers/rule_controller.js";

const router = Router();

router.get('/rules', getAllRules)
router.get('/rules/count', getRulesCount)
router.get('/rules/:id',getRule)

router.post('/rules',createRule)

router.put('/rules/:id',updateRule)

router.delete('/rules/:id',deleteRule)
router.delete('/rules',deleteAllRules)

export default router