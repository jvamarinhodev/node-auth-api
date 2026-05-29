import bcrypt from 'bcrypt';
import { saveUser } from '../../database/queries/userQueries.js';

export const postUserRegistration = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const id = await saveUser(name, email, password);

    return res.status(201).json({
      success: true,
      message: `user ${name} created`,
      user: { id, name, email },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: 'Server error', message: err.message });
  }
};
