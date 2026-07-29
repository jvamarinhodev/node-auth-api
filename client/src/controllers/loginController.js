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

    const bodyObj = JSON.parse(response.body);

    res.setHeader('Set-Cookie', [
      `accessToken=${bodyObj.accessToken}; HTTPOnly; Secure; SemiSite=Strict; Path=/; Max-Age=900`
    ])

    res.redirect('/dashboard');
  } catch (error) {
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
