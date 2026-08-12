import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { saveRefreshToken, searchEmail } from '../../database/queries/userQueries.js';

export const postLoginAuthorization = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Invalid e-mail or password field!',
    });
  }
  try {
    const identifiedUser = await searchEmail(email);

    if (!identifiedUser || identifiedUser.length === 0) {
      return res.status(400).json({
        success: false,
        massage: 'User not found!',
      });
    }

    const hashPassword = identifiedUser.password;

    const verify = await bcrypt.compare(password, hashPassword);

    // convert milliseconds to days to ensure token expiration
    const ONE_DAY_MS = 24 * 60 * 60 * 1000;
    const expiresAt = new Date(Date.now() + ONE_DAY_MS);

    if (verify === true) {
      const accessToken = jwt.sign({ id: identifiedUser.id }, process.env.JWT_ACCESS_TOKEN, { expiresIn: '10m' });

      const refreshToken = jwt.sign({ id: identifiedUser.id }, process.env.JWT_ACCESS_TOKEN, { expiresIn: '1d' });

      // Save refreshToken together user id
      await saveRefreshToken(identifiedUser.id, refreshToken, expiresAt);

      return res.status(200).json({
        success: true,
        message: 'Login successful!',
        accessToken,
        refreshToken,
      });

      res.redirect('/dashboard');

      console.log(accessToken);
    } else if (verify === false) {
      return res.status(400).json({
        success: false,
        message: 'Incorrect password!',
      });
    }
  } catch (err) {
    return res.status(500).json({ err: 'Server error', message: err.message });
  }
};
