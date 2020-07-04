import mongoose from 'mongoose';

const Lecture = mongoose.model('Lecture');

export default function showStartPage(req, res) {
    Lecture.find({})
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
}
