import mongoose from 'mongoose';

const Group = mongoose.model('Group');

export default function showGroups(req, res) {
    Group.find({})
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
}
