var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var jobSchema = new Schema({
    name: String,
    type: {type: String, enum: ['Follower']},
    gofundme_url: String,
    charity: {type: Schema.Types.ObjectId, ref: 'Charity'},
    landing_text: String,
    denomination: Number,
    max_amount: Number,
    active: Boolean,
    last_run_at: Date,
    created_at: Date,
    updated_at: Date
});

jobSchema.statics.TYPE_FOLLOWER = 'Follower';

jobSchema.methods.getFollowers = function(cb) {
  return this.model('Follower').find({ job_id: this._id }, cb);
};

// on every save, add the date
jobSchema.pre('save', function(next) {
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
var Job = mongoose.model('Job', jobSchema);

// make this available to our Jobs in our Node applications
module.exports = Job;