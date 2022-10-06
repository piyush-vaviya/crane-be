const express = require('express');
const Channel = require('../models/channel');
const Message = require('../models/message');
const router = express.Router();
const AppError = require('../utils/appError');

router.get('/channel', async (req, res) => {
  const channelCollection = await Channel.find({ status: true });
  res.status(200).send({
    status: 'success',
    data: channelCollection,
  });
});

router.post('/channel', async (req, res, next) => {
  try {
    if (!req.body?.name) return next(new AppError('Enter a channel name', 400));

    const { name, description, isPublic, participant } = req.body;

    const newChannel = await Channel.create({ name, description, isPublic });

    if (!newChannel) return next(new AppError('channel not created, Try again!', 400));
    const { _id } = newChannel;

    await Channel.findByIdAndUpdate({ _id }, { $push: { participants: participant } });

    res.status(201).send({
      success: 'channel created',
      _id: newChannel._id,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
