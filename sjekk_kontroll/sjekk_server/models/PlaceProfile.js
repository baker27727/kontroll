import mongoose, { Schema } from 'mongoose';

const PlaceProfileSchema = new Schema({
    place:{
        type: Schema.Types.ObjectId,
        ref: 'Place',
    },
    name: { 
        type: String, 
        required: true 
    },
    type: { 
        type: String, 
        required: true 
    },
    access_link:{
        type: String,
        default: null
    },
    access_code: { 
        type: String, 
        required: true 
    },
    free_parking_hours: {
        type: Number,
        required: true
    },
    created_at: {
        type: String,
        required: true
    },
    updated_at: {
        type: String,
        default: null
    }
});

const PlaceProfileModel = mongoose.model('PlaceProfile', PlaceProfileSchema);

export default PlaceProfileModel;
