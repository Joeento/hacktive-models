var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var paymentSchema = new Schema({
    i_owe_yous: [{ type: Schema.Types.ObjectId, ref: 'IOweYou' }],
    created_at: Date,
    updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var Payment = mongoose.model('Payment', paymentSchema);

// on every save, add the date
paymentSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

// make this available to our Payments in our Node applications
module.exports = Payment;