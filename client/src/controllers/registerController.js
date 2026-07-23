import { apiClient } from '../services/apiServices.js';

export const getRegister = async (req, res) => {
  try {
    res.render('auth/register');
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

    if (!response) {
      return res.status(400).json({
        success: false,
        message: 'Error',
      });
    }
    res.redirect('/login');
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
};
