var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var donationSchema = new Schema({
    job: {type: Schema.Types.ObjectId, ref: 'Job'},
    tweet_id: String,
    amount: Number,
    created_at: Date,
    updated_at: Date
});

// on every save, add the date
donationSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});
// the schema is useless so far
// we need to create a model using it
var Donation = mongoose.model('Donation', donationSchema);

// make this available to our Donations in our Node applications
module.exports = Donation;