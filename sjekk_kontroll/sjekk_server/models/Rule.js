import * as mongoose from "mongoose";

const RuleSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    charge:{
        type: Number,
        required: true
    },

    policy_time:{
        type: Number,
        required: true
    },

    extras: {
        meter_receipt_number: {
            type: Boolean,
            default: false
        },
        meter_number:{
            type: Boolean,
            default: false
        },
        expiry_date: {
            type: Boolean,
            default: false
        },
        paid_amount: {
            type: Boolean,
            default: false
        }
    },

    created_at:{
        type: String,
        required: true,
    },

    updated_at:{
        type: String,
        default: null
    },
})

const RuleModel = mongoose.model('Rule', RuleSchema)

export default RuleModel