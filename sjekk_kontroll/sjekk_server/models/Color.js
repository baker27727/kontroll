import * as mongoose from "mongoose";

const ColorSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true
    }
})

const ColorModel = mongoose.model('Color', ColorSchema)

export default ColorModel