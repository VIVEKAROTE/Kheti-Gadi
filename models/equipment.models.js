import mongoose  from "mongoose";

const equipmentSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: [true, 'Please enter equipment name']
    },
    category: {
        type: String,
        required: true,
        enum: ['Tractor', 'Harvester','Power Tiller', 'Plough', 'Rotavator','Razor','Thresher','Cultivator' ,'Other']
    },
    description: {
        type: String,
        required: true
    },
    pricePerDay:{
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    images:[{type: String}], // Array of Url cloudinary
    isAvailable: {
        type: Boolean,
        default: true
    }

},{ timestamps: true});



const Equipment = mongoose.model('Equipment', equipmentSchema);

export default Equipment;