var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var followerSchema = new Schema({
    handle: String,
    name: String,
    job_id: {type: Schema.Types.ObjectId, ref: 'Job'},
    last_scanned_at: Date,
    created_at: Date,
    updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var Follower = mongoose.model('Follower', followerSchema);
// on every save, add the date
followerSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});


// make this available to our Followers in our Node applications
module.exports = Follower;