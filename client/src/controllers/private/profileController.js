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

      const refreshTokenResponse = await apiClient('/auth/refreshtoken', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });

      res.cookie('accessToken', refreshTokenResponse.accessToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: 'strict',
        path: '/',
        maxAge: 15 * 60 * 1000,
      });

      res.cookie('refreshToken', refreshTokenResponse.refreshToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: 'strict',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      const profileResponse = await apiClient('/auth/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${refreshTokenResponse.accessToken}`,
        },
      });

      return res.render('dashboard/profile', { response: profileResponse });
    } catch (refreshError) {
      console.log(refreshError);

      res.render('auth/login');
    }
  }
};
