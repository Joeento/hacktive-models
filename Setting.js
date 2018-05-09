var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var settingSchema = new Schema({
    name: String,
    label: String,
    value: Schema.Types.Mixed,
    created_at: Date,
    updated_at: Date
});

settingSchema.statics.SETTING_DEBUG_MODE = 'debug_mode';

// on every save, add the date
settingSchema.pre('save', function(next) {
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
var Setting = mongoose.model('Setting', settingSchema);

// make this available to our Settings in our Node applications
module.exports = Setting;