import Booking from "../models/booking.models.js";
import Equipment  from "../models/equipment.models.js";

export const createBooking = async (req, res) => {
    try{
        const { equipmentId, startDate, endDate} = req.body;

        // find equipment

        const equipment = await Equipment.findById(equipmentId);

        if(!equipment){
            return res.status(404).json({ message: "Equipment not found"});
        }

        // calculate dates

        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs( end - start);
        const diffDays = Math.ceil(diffTime / (1000* 60 *60 * 24)) || 1;

        // calculate total price
        const totalPrice = diffDays * equipment.pricePerDay;
        
        // check for existing ovelapping bookings 

        const overlappingBooking = await Booking.findOne({
            equipment: equipmentId,
            status: {$ne: 'cancelled' }, // Ignore cancelled bookings
            $or: [
                {
                    startDate: { $lte: req.body.endDate },
                    endDate: {$gte: req.body.startDate }
                }
            ]
        });

        if(overlappingBooking){
            return res.status(400).json({
                message: "This equipment is already booked for the selected dates."
            })
        }

        // create Booking
        const booking = await Booking.create({
            equipment: equipmentId,
            farmer: req.user._id,
            owner: equipment.owner,
            startDate,
            endDate,
            totalPrice
        });
        res.status(201).json({ success: true, data: booking});
    }catch(error){
        res.status(400).json({ sucess: false, message: error.message})
    }
};

//@desc Get logged in user bookings
//@route Get /api/bookings/mybookings

export const getMyBookings = async (req,res) => {
    try{
        let bookings;
        // if they are owner show bokings of their equipment

        if(req.user.role === 'owner'){
            bookings = await Booking.find({ owner: req.user._id }).populate('equipment farmer');
        }else{
            //  if farmer show their own bookings
            bookings = await Booking.find({ farmer: req.user._id}).populate('equipment owner');
        }
        res.status(200).json({ success: true , data: bookings });
    }catch(error){
        res.status(500).json({ sucess: false, message: error.message })
    }
}