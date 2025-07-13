import * as mongoose from "mongoose";

const ShiftSchema = new mongoose.Schema({
    start_date:{
        type: String,
        required: true
    },

    end_date:{
        type: String,
        default: null
    },

    user_identifier:{
        type: String,
        required: true
    },

    logins: [{
        place_name: String,
        login_time: String,
        logout_time: String,
        place_id: String
    }],

    total_completed_violations:{
        type: Number,
        default: null
    },

    created_at:{
        type: String,
        required: true
    }
})

const ShiftModel = mongoose.model('Shift', ShiftSchema)

export default ShiftModel