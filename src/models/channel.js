const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please tell us channel name!'],
    unique: true,
    maxLength: [80, 'must be less than or equal to 80'],
  },
  description: {
    type: String,
    default: '',
  },
  participants: Array,
  isPublic: {
    type: Boolean,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const Channel = mongoose.model('Channel', channelSchema);
module.exports = Channel;
