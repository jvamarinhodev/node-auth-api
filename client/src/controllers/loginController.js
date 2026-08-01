import { apiClient } from '../services/apiServices.js';

export const getLogin = async (req, res) => {
  try {
    res.render('auth/login', { layout: false });
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
};

export const postLogin = async (req, res) => {
  try {
    const response = await apiClient('/login', {
      method: 'POST',
      body: JSON.stringify(req.body),
    });

    const isProd = process.env.NODE_ENV === 'production';

    res.cookie('accessToken', response.accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'strict',
      path: '/',
      maxAge: 15 * 60 * 1000,
    });

    res.cookie('refreshToken', response.refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'strict',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.render('home/index');
  } catch (error) {
    console.log(error);

    if (error.status === 400 && error.data) {
      return res.render('auth/login', {
        layout: false,
        globalError: error.data.message || error.data.massage,
        values: req.body,
      });
    }

    return res.render('auth/login', {
      layout: false,
      globalError: 'Something went wrong. Try again!',
      values: req.body,
    });
  }
};
