const mongoose = require('mongoose');
const validator = require('validator');
const slug = require('slugify');

const branchSchema = mongoose.Schema({
 name: {
  type: String,
  required: [true, 'A center must have a name.'],
  trim: true,
 },
 email: {
  type: String,
  required: [true, 'A center must have an email address'],
  unique: true,
  validate: [validator.isEmail, 'A valid email address is needed!'],
 },
 address: {
  type: String,
  required: [true, 'A center must have an address'],
  trim: true,
 },
 city: {
  type: String,
  required: [true, 'A center must have a city'],
  trim: true,
 },
 state: {
  type: String,
  required: [true, 'A center must be have a state property!'],
 },
 center: {
  type: mongoose.Schema.ObjectId,
  ref: 'Center',
 },
});

branchSchema.pre(/^find/, function (next) {
 this.populate({
  path: 'center',
  select: 'name address',
 });

 next();
});

const Branch = mongoose.model('Branch', branchSchema);
module.exports = Branch;
