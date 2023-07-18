const mongoose = require("mongoose");



const cartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 }
});



const cartSchema =  new mongoose.Schema({
     user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
     items: { type: [cartItemSchema], default: [] },
     updatedOn: { type: Date },
     createdOn: { type: Date }
    
});



cartSchema.pre('save', function(next) {
    this.updatedOn = new Date();
    this.createdOn = new Date();

    next();
});



cartSchema.pre(['update', 'findOneAndUpdate', 'updateOne'], function(next) {
    const update = this.getUpdate();
    delete update._id;

    this.updatedOn = new Date();

    next();
});




module.exports = mongoose.model("Cart", cartSchema);