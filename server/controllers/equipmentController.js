import Equipment from '../models/equipment.models.js';


// @desc Add new Equipment
// @route POST /api/equipment
// @access Private/Owner


export const addEquipment = async (req, res) => {
    try{
        req.body.owner = req.user._id;

        // check if files were uploaded

        if (req.files){
            req.body.images = req.files.map( file => file.path)
        }

        const equipment = await Equipment.create(req.body);

        res.status(201).json({
            success: true,
            data: equipment
        });
    } catch(error){
        res.status(400).json({success: false, message: error.message });
    }
};


// @desc Get all equipment
// @route GET /api/equipment
// @access Public

export const getEquipment = async (req, res) => {
    try{
        const equipments = await Equipment.find().populate('owner', 'name phoneNumber')
        res.status(200).json({ success: true, data: equipments })
    } catch(error){
        res.status(500).json({ success: false, message: error.message })
    }
};

// @desc Get equipment by ID
// @route GET /api/equipment/:id
// @access Public

export const getEquipmentById = async (req, res) => {
    try {
        const equipment = await Equipment.findById(req.params.id).populate('owner', 'name phoneNumber email');
        if (!equipment) {
            return res.status(404).json({ success: false, message: "Equipment not found" });
        }
        res.status(200).json({ success: true, data: equipment });
    } catch(error) {
        res.status(500).json({ success: false, message: error.message });
    }
};