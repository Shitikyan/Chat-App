import bcrypt from 'bcrypt';
import { User } from '../models/userModel';
import Joi from 'joi';

const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),

  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

  repeat_password: Joi.ref('password'),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
})
  .with('username', 'password')
  .with('username', 'email')
  .with('password', 'repeat_password');

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user)
      return res.status(401).json({
        error: 'Incorrect Username or Password',
        success: false,
      });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({
        error: 'Incorrect Username or Password',
        success: false,
      });

    delete user.password;
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const { error, value } = await schema.validate({
      username: username,
      password: password,
      email: email,
    });
    const usernameCheck = await User.findOne({ username: value.username });

    if (usernameCheck)
      return res.status(409).json({
        error: 'Username already used',
        success: false,
      });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res
        .status(409)
        .json({ error: 'Email already used', success: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.params.id },
    }).select(['email', 'username', 'avatarImage', '_id']);
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const setAvatar = async (req, res) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true },
    );
    return res.status(200).json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logOut = (req, res) => {
  try {
    if (!req.params.id) return res.json({ msg: 'User id is required ' });
    global.onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
