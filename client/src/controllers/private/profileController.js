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
  } catch (error) {
    console.log(error);

    if (error.status !== 401) {
      return res.render('auth/login');
    }

    try {
      const refreshToken = req.cookies.refreshToken;

      await apiClient('/auth/refreshtoken', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });

      const newAccessToken = req.cookies.accessToken;

      const profileResponse = await apiClient('/auth/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${newAccessToken}`,
        },
      });

      return res.render('dashboard/profile', { response: profileResponse });
    } catch (refreshError) {
      console.log(refreshError);

      res.render('auth/login');
    }
  }
};
