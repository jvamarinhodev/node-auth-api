import { apiClient } from '../services/apiServices.js';

export const getRegister = async (req, res) => {
  try {
    res.render('auth/register', { layout: false });
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
};

export const postRegister = async (req, res) => {
  try {
    const response = await apiClient('/register', {
      method: 'POST',
      body: JSON.stringify(req.body),
    });

    res.redirect('/login');
  } catch (error) {
    // error validator
    if (error.status === 400 && error.data?.error) {
      return res.render('auth/register', {
        layout: false,
        error: error.data.error,
        values: req.body,
      });
    }
    //global error
    return res.render('auth/register', {
      layout: false,
      globalError: 'Something went wrong. Try again!',
      values: req.body,
    });
  }
};
