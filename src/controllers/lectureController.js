import mongoose from 'mongoose';

const Lecture = mongoose.model('Lecture');

// Send lectures(all or with current ID) info in json format (Method GET)
function showLectures(req, res, isIdTyped = false) {
    if (!isIdTyped) {
        Lecture.find({})
            .then((data) => res.status(200).json(data))
            .catch((err) => res.json(err));
    } else {
        Lecture.findById(req.params.id)
            .then((data) => res.json(data))
            .catch((err) => { res.status(404).json(err); });
    }
}

// Create a new lecture (Method POST)
function createLecture(req, res) {
    const lecture = new Lecture();
    lecture.theme = req.body.theme;
    lecture.lecturer = req.body.lecturer;
    lecture.classroom = req.body.classroom;
    lecture.group = req.body.group;
    lecture.day = req.body.day;
    lecture.time = req.body.time;
    lecture.save((err, doc) => {
        if (!err) {
            res.status(200).json('OK');
        } else {
            console.log(err);
        }
    });
}

function changeLecture(req, res) {
    Lecture.findByIdAndUpdate(req.body._id, {
        theme: req.body.theme,
        lecturer: req.body.lecturer,
        classroom: req.body.classroom,
        group: req.body.group,
        day: req.body.day,
        time: req.body.time,
    }, { new: true }, (err, lecture) => {
        if (err) {
            console.log(err);
            res.status(500);
        } else {
            res.status(202).json(lecture);
        }
    });
}

export { createLecture, showLectures, changeLecture };
