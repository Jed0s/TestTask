import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
});

mongoose.model('Group', groupSchema);
