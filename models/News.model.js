const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    img: {
        type: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    publishedAt: {
        type: Date,
        required: true
    },
    timestamps: {
        type: Date,
        default: Date.now
    }
});

newsSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('News', newsSchema);
