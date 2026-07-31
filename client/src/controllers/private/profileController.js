import { apiClient } from '../../services/apiServices.js';

export const getProfileView = (req, res) => {
  try {
    res.render('dashboard/profile');
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
};

export const getProfile = async (req, res) => {
  try {
    const response = await apiClient('/private/profile', {
      method: 'POST',
      body: JSON.stringify(req.body),
    });

    
  } catch (error) {}
};
