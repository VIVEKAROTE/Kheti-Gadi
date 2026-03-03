import express from 'express';
import { addEquipment, getEquipment } from '../controllers/equipmentController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.route('/')
    .get(getEquipment)
    .post(protect, authorize('owner'), upload.array('images', 5) ,addEquipment)
    

export default router; 