import mongoose from "mongoose"

const ReportSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },

    filetype: {
        type: String,
        required: true,
        enum: ['car_log', 'accounting']
    },

    link: {
        type: String,
        required: true
    },

    notes: {
        type: String,
        required: true
    },

    report_inner_details: {
        total_parking_time: {
            type: Number,
            required: true
        },

        total_parkings: {
            type: Number,
            required: true
        },

        average_parking_time: {
            type: Number,
            required: true
        },

        revenue: {
            type: Number,
            default: 12000
        }
    },

    created_at: {
        type: String,
        required: true
    }
})

const ReportModel = mongoose.model('Report', ReportSchema)

export default ReportModel