import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: `${__dirname}/../config/.env` });

const Lecture = mongoose.model('Lecture');

/* mongoose check data before saving, but not before updating => this
function does it instead of mongoose */
function checkClientData(data) { // if data incorrect - return false, else true
    let isDataCorrect = true;
    if (data.theme.length < process.env.LECTURE_THEME_MIN
        || data.theme.length > process.env.LECTURE_THEME_MAX) {
        isDataCorrect = false;
    } else if (data.classroom <= 0) {
        isDataCorrect = false;
    }
    return isDataCorrect;
}

// Send lectures(all or with current ID) info in json format (Method GET)
function showLectures(req, res, isIdTyped = false) {
    if (!isIdTyped) {
        Lecture.find({})
            .then((data) => res.status(200).json(data))
            .catch((err) => {
                res.status(500).json('Failed to get lecture.');
                console.log(err);
            });
    } else {
        Lecture.findById(req.params.id)
            .then((data) => {
                if (data == null) {
                    res.status(400).json('Lecture with current ID not found.');
                } else {
                    res.status(200).json(data);
                }
            })
            .catch((err) => {
                if (err.message instanceof mongoose.Error.CastError) {
                    res.status(400).json('Incorrect lecture ID. Try another.');
                } else {
                    res.status(500).json('Failed to get lecture.');
                    console.log(err);
                }
            });
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
            res.status(200).json('Lecture created.');
        } else {
            console.log(err);
            res.status(500).json('Failed to create lecture.');
        }
    });
}

// Update lecture with current ID (Method PUT)
function changeLecture(req, res) {
    if (!checkClientData(req.body)) {
        res.status(400).json('Incorrect client data.');
    } else {
        Lecture.findByIdAndUpdate(req.body.id, {
            theme: req.body.theme,
            lecturer: req.body.lecturer,
            classroom: req.body.classroom,
            group: req.body.group,
            day: req.body.day,
            time: req.body.time,
        }, { new: true }, (err, lecture) => {
            if (err) {
                console.log(err);
                res.status(500).json('Failed to change lecture.');
            } else {
                res.status(200).json(`Lecture with id '${req.body.id}' was changed.`);
            }
        });
    }
}

// Delete lecture with current ID (Method DELETE)
function deleteLecture(req, res) {
    Lecture.findByIdAndDelete(req.body.id, (err, doc) => {
        if (err) {
            res.status(500).json('Failed to delete lecture.');
            console.log(err);
        } else if (doc == null) {
            res.status(400).json(`Lecture with id '${req.body.id}' not found.`);
        } else {
            res.status(200).json(`Lecture with id '${req.body.id}' was deleted.`);
        }
    });
}

export {
    createLecture, showLectures, changeLecture, deleteLecture,
};
