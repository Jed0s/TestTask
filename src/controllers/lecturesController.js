import mongoose from 'mongoose';

const Lecture = mongoose.model('Lecture');

// Send lectures(all or with current ID) info in json format
export default function showLectures(req, res, isIdTyped = false) {
    if (!isIdTyped) {
        Lecture.find({})
            .then((data) => res.status(200).json(data))
            .catch((err) => res.json(err));
    } else {
        Lecture.findById(req.params.id)
            .then((data) => res.json(data))
            .catch((err) => res.json(err));
    }
}
