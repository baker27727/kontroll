import * as mongoose from "mongoose"

const BrandSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true
    }
})

const BrandModel = mongoose.model('Brand', BrandSchema)

export default BrandModel