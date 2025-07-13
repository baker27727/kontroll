import * as mongoose from "mongoose";

const CarSchema = new mongoose.Schema({

    brand:{
        type: String,
        required: true,
    },

    type:{
        type: String,
        required: true,
    },

    color:{
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    plate_number:{
        type: String,
        required: true,
    },

    registeration_source:{
        type: String,
        required: true,
    },

    registeration_source_id:{
        type: String,
    },

    registeration_type:{
        type: String,
        required: true,
    },

    place:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place'
    },

    free_parking_time:{
        type: Number,
        default: null
    },

    start_date:{
        type: String,
        required: true,
    },

    end_date:{
        type: String,
        required: true,
    },

    created_at:{
        type: String,
        required: true,
    },
})

const CarModel = mongoose.model('Car', CarSchema)

export default CarModel