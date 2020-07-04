import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const lecturerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
});

mongoose.model('Lecturer', lecturerSchema);
