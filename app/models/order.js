var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Order', new Schema({
    quantity: { type: Number },
    amount: { type: Number },
    rsName: { type: String },
    gold: { type: String },
    userID: { type: String },
    itemID: { type: String},
    discount: { type: String},
    subtotal: { type: String},
    final: { type: String},
}, 
{
    timestamps: true,
    collection: 'Order'
}));