import mongoose from 'mongoose';

const Lecturer = mongoose.model('Lecturer');

// Send lecturers' names in json format
export default function showLecturers(req, res) {
    Lecturer.find({})
        .then((data) => {
            if (data) {
                res.json(data);
            } else {
                res.status(404);
            }
        })
        .catch((err) => res.json(err));
}
