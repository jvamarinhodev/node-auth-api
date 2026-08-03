import { apiClient } from '../../services/apiServices.js';

export const publicAccess = async (req, res) => {
  try {
    res.render('dashboard/start');
  } catch (error) {
    res.status(500).send(`error: ${error.message}`);
  }
};
