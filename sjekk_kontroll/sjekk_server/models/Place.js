import * as mongoose from "mongoose";

const PlaceSchema = new mongoose.Schema({
    location:{
        type: String,
        required: true
    },

    policy:{
        type: String,
        required: true
    },

    code:{
        type: String,
        required: true
    },

    created_at:{
        type: String,
        required: true
    },

    partner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Partner',
        required: true
    },
})

const PlaceModel = mongoose.model('Place', PlaceSchema)

export default PlaceModel