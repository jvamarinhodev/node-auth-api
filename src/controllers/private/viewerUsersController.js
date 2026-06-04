import { getAllUsers } from '../../database/queries/userQueries.js';

export const getListUser = async (req, res) => {
  const listUser = await getAllUsers();
  res.status(201).json(listUser);
};
