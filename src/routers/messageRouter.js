const express = require('express');
const { ObjectId } = require('mongoose').Types;
const Message = require('../models/message');
const router = express.Router();
const he = require('he');

router.get('/message', async (req, res) => {
  // const senderUsername = req?.query?.sender;
  // const receiverUsername = req?.query?.receiver;
  const query = { status: 'active' };
  const ids = [];
  // jyare frontend mathi sender and receiver ma _id mokalva mad tyare aa nichenu uncomment kri deje
  // if (req?.query?.sender) ids.push(ObjectId(req.query.sender));
  // if (req?.query?.receiver) ids.push(ObjectId(req.query.receiver));
  // if (ids.length) {
  //   query.$or = [
  //     {
  //       senderId: {
  //         $in: ids,
  //       },
  //     },
  //     {
  //       receiverId: {
  //         $in: ids,
  //       },
  //     },
  //   ];
  // }
  const allMessageCollection = await Message.find(query).lean();
  // aanathi have jo yagnesh logged in user hoy and piyush ne view karto hoy to only eva messages
  // aavva joiye je kaa to yagnesh kaa to piyush e send krya hoy.
  // ok
  res.status(200).send({
    status: 'success',
    data: allMessageCollection,
  });
});

router.post('/message', async (req, res) => {
  try {
    if (!req.body?.message?.trim()) {
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, 8500)
      );
      return res.status(400).send({ message: 'Enter Message' });
    }
    // aya sender essa
    const { message, localId } = req.body;

    const decodedMessage = he.decode(message || '');
    console.log('🚀 ~ router.post ~ decodedMessage', decodedMessage);

    const newMessage = await Message.create({ message: decodedMessage, localId });

    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 10500)
    );
    console.log('hii');
    res.status(201).send({
      success: 'message send',
      _id: newMessage._id,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/message', async (req, res) => {
  if (!req.body._id && !req.body.message.trim()) {
    return res.status(400).send({ message: 'Enter Message' });
  }
  const { message, _id } = req.body;
  const decodedMessage = he.decode(message || '');

  const existMessage = await Message.findByIdAndUpdate({ _id: _id }, { $set: { message: decodedMessage } });
  // console.log('existMessage', Object.values(existMessage));
  console.log('existMessage');

  await new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, 7500)
  );

  if (!existMessage)
    return res.status(404).send({
      status: 'failed',
      message: `No message found`,
    });
  res.status(200).send({
    success: 'success',
    message: 'message updated',
  });
});

router.delete('/message', async (req, res) => {
  if (!req.query.id) {
    return res.status(400).send({ message: 'message id not found' });
  }
  const deleteMessage = await Message.updateOne({ _id: req.query.id }, { $set: { status: false } });

  if (!deleteMessage)
    return res.status(404).send({
      status: 'failed',
      message: `No message found`,
    });
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, 2500)
  );

  res.status(200).send({
    success: 'success',
  });
});

module.exports = router;
