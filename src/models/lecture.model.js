import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const lectureSchema = new Schema({
    theme: {
        type: String,
        required: true,
    },
    lecturer: {
        type: Schema.Types.ObjectId,
        ref: 'Lecturer',
        required: true,
    },
    classroom: {
        type: Number,
        required: true,
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        required: true,
    },
    day: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
});

mongoose.model('Lecture', lectureSchema);
