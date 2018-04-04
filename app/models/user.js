var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    password: { type: String },
    address1: { type: String },
    address2: { type: String },
    pincode: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    isDeleted: { type: Boolean, default: false },
    isVerified: { type: String, default: false },
    isActivate: { type: Boolean, default: true }
}, 
{
    timestamps: true,
    collection: 'User'
}));