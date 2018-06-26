var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var iOweYouSchema = new Schema({
    follower: {type: Schema.Types.ObjectId, ref: 'Follower'},
    tweet: {
      id: String,
      text: String,
      date: Date
    },
    amount: Number,
    paid: Boolean,
    paid_at: Number,
    created_at: Date,
    updated_at: Date
});

// on every save, add the date
iOweYouSchema.pre('save', function(next) {
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
var IOweYou = mongoose.model('IOweYou', iOweYouSchema);

// make this available to our IOweYous in our Node applications
module.exports = IOweYou;