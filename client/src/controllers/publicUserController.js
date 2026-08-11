import { apiClient } from '../services/apiServices.js';

export const getPublicAccess = async (req, res) => {
  try {
    const response = await apiClient('/profile', {
      method: 'GET',
    });

    res.render('dashboard/start', { response });
  } catch (error) {
    res.status(500).send(`error: ${error.message}`);
  }
};
