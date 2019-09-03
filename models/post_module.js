const mongoose = require('mongoose');

const schema = mongoose.Schema;

const PostSchema = schema({
    name: {type: String, require: true},
    message: {require: true, type: String},
    postdate: {default: Date.now(), type: Date},
    userid: {type: schema.Types.ObjectId, ref: 'user'},
});

module.exports = mongoose.model('post', PostSchema);
