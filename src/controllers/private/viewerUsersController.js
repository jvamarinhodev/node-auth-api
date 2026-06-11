import { getAllUsers } from '../../database/queries/userQueries.js';

export const getListUser = async (req, res) => {
  try {
    const listUser = await getAllUsers();
    res.status(201).json(listUser);
  } catch (err) {
    return res.status(500).json({ err: 'Server error', message: err.message });
  }
};
