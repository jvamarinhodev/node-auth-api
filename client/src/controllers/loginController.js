import { apiClient } from '../services/apiServices.js';

export const getLogin = (req, res) => {
  try {
    res.render('auth/login');
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

    if (!response) {
      return res.status(400).json({
        success: false,
        message: 'Error',
      });
    }

    res.render('dashboard/index');
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
};
