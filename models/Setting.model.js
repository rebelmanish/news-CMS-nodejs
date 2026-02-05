const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
    website_title: {
        type: String,
        required: true,
        trim: true
    },
    website_logo: {
        type: String
    },
    footer_description: {
        type: String,
        required: true,
        trim: true
    }
}, 
{ 
    timestamps: true 
}
);

module.exports = mongoose.model('Settings', settingSchema);
