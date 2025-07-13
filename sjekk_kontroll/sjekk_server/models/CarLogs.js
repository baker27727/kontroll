import * as mongoose from "mongoose"

const CarLogSchema = new mongoose.Schema({
    start_date: {
        type: String,
        required: true
    },

    end_date: {
        type: String,
        required: true
    },

    registered_by: {
        type: String,
        required: true
    },

    registeration_data: {
        place_id: {
            type: String,
            required: true
        },

        gateway: {
            required: true,
            type: String
        },

        car_details: {
            brand:{
                type: String,
                required: true,
            },
        
            type:{
                type: String,
                required: true,
            },
        
            description: {
                type: String,
                required: true,
            },
        
            color: {
                type: String,
                required: true
            }
        }
    },

    plate_number:{
        type: String,
        required: true,
    },

    place: {
        location:{
            type: String,
            required: true
        },
        
        code:{
            type: String,
            required: true
        },
    },

    created_at: {
        type: String,
        required: true
    }
})

const CarLogModel = mongoose.model('CarLog', CarLogSchema)

export default CarLogModel