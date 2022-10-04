const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  channelId: {
    type: String,
    default: '',
  },
  senderId: {
    type: String,
    default: '',
  },
  receiverId: {
    type: String,
    default: '',
  },
  localId: {
    type: String,
  },
  message: {
    type: String,
    required: true,
  },
  messageTime: {
    type: Date,
    default: new Date(),
  },
  status: {
    type: String,
    default: 'active',
  },
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
