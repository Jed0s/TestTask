import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    group: {
        type: Schema.Types.ObjectId,
        required: true,
    },
});

mongoose.model('Student', studentSchema);
