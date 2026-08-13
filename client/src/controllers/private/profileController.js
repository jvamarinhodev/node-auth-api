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

    res.render('dashboard/profile', { response });

    console.log(response);
  } catch (error) {
    if (error.message != 'Invalid Token!') {
      res.render('auth/login');
    } else {
      const response = await apiClient('/auth/refreshtoken', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      res.render('dashboard/profile', { response });
    }

    res.status(500).send(`error: ${error.message}`);
  }
};
