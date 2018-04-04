var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Cart', new Schema({
    quantity: { type: Number },
    amount: { type: Number },
    rsName: { type: String },
    gold: { type: String },
    userID: { type: String }
}, 
{
    timestamps: true,
    collection: 'Cart'
}));