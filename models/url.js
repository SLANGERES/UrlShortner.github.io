const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  shortId: { type: String, required: true },
  redirectURL: { type: String, required: true }, // Make sure this is redirectURL
  visitHistory: [{ timestamp: {type:Number } }],
},

{timestamps:true})
const URL = mongoose.model('URL', urlSchema);

module.exports = URL;
