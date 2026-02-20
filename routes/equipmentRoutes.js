import express from 'express';
import { addEquipment, getEquipment } from '../controllers/equipmentController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';


const router = express.Router();

router.route('/')
    .get(getEquipment)
    .post(protect, authorize('owner'), addEquipment);

export default router; 