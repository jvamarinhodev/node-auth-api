import jwt from 'jsonwebtoken';
import { getUserByRefreshToken } from '../../database/queries/userQueries.js';

export const postRefreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({
      success: false,
      message: 'Invalid token!',
    });
  }

  try {
    const verifyRefresh = await getUserByRefreshToken(refreshToken);

    if (!verifyRefresh || verifyRefresh.length === 0) {
      return res.status(403).json({
        success: false,
        message: 'Invalid token!',
      });
    }

    const decode = jwt.verify(refreshToken, process.env.JWT_ACCESS_TOKEN);
    //Create an accessToken using the data from the existing refreshToken
    const accessToken = jwt.sign({ id: decode.id }, process.env.JWT_REFRESH_TOKEN, { expiresIn: '10m' });

    res.status(201).json({
      success: true,
      newAccessToken: accessToken,
    });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Refresh token expired. Please log in again!',
      });
    }
    return res.status(403).json({
      success: false,
      message: 'Invalid refresh token!',
    });
  }
};
