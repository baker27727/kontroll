import * as mongoose from 'mongoose';

const TypeSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true
    }
})

const TypeModel = mongoose.model('Type', TypeSchema)

export default TypeModel