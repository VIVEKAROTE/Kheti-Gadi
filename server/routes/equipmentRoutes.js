import express from 'express';
import { addEquipment, getEquipment, getEquipmentById } from '../controllers/equipmentController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.route('/')
    .get(getEquipment)
    .post(protect, authorize('owner'), upload.array('images', 5) ,addEquipment);

router.route('/:id')
    .get(getEquipmentById);

export default router; 