import mongoose from 'mongoose';

const Student = mongoose.model('Student');

// Create a new student (Method POST)
function createStudent(req, res) {
    const student = new Student();
    student.name = req.body.name;
    student.group = req.body.group;
    Student.findOne({ name: student.name }, (error, result) => {
        if (!error) {
            if (result) {
                res.status(400).json('Student with this name already exists.');
            } else {
                student.save((err, doc) => {
                    if (!err) {
                        res.status(200).json('OK');
                    } else {
                        res.status(500);
                    }
                });
            }
        } else {
            console.log(error);
            res.status(500);
        }
    });
}

export { createStudent };
