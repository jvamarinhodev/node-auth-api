import { apiClient } from '../../services/apiServices.js';

export const getPublicAccess = async (req, res) => {
  try {
    const token = req.cookies.accessToken;

    const response = await apiClient('/auth/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(req.body),
    });
    res.render('dashboard/profile');
    console.log(response);
  } catch (error) {
    res.status(500).send(`error: ${error.message}`);
  }
};
