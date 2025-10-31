let mongoose = require('mongoose');
let messageSchema = mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true
    },
    to: {
        type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true
    },
    text: {
        type: String, required: true
    }
},{
    timestamps: true
})
module.exports = mongoose.model("message",messageSchema);