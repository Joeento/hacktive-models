var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var messageSchema = new Schema({
    name: String,
    email_address: String,
    subject: String,
    body: String,
    read: { type: Boolean, default: false },
    created_at: Date,
    updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var Message = mongoose.model('Message', messageSchema);
// on every save, add the date
messageSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});


// make this available to our Messages in our Node applications
module.exports = Message;