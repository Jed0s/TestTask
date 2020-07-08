import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: `${__dirname}/../config/.env` });

const Schema = mongoose.Schema;

const lectureSchema = new Schema({
    theme: {
        type: String,
        minlength: process.env.LECTURE_THEME_MIN,
        maxlength: process.env.LECTURE_THEME_MAX,
        required: true,
    },
    lecturer: {
        type: Schema.Types.ObjectId,
        ref: 'Lecturer',
        required: true,
    },
    classroom: {
        type: Number,
        min: 1,
        required: true,
    },
    group: {
        type: [Schema.Types.ObjectId],
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
