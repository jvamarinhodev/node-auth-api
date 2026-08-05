import { apiClient } from '../services/apiServices.js';

export const getPublicAccess = async (req, res) => {
  try {
    res.render('dashboard/start');
  } catch (error) {
    res.status(500).send(`error: ${error.message}`);
  }
};
