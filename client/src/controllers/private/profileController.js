import { apiClient } from '../../services/apiServices.js';

export const getPrivateAccess = async (req, res) => {
  try {
    const token = req.cookies.accessToken;

    const response = await apiClient('/auth/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.render('dashboard/profile');

    console.log(response[0].email);
  } catch (error) {
    console.log(error);

    res.status(500).send(`error: ${error.message}`);
  }
};
