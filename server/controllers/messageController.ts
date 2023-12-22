import { Messages } from '../models/messageModel';

export const getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map(msg => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.status(200).json(projectedMessages);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const addMessage = async (req, res) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data)
      return res.status(200).json({ msg: 'Message added successfully.' });
    else
      return res.status(500).json({
        msg: 'Failed to add message to the database',
      });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
