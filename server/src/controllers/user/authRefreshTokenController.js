import jwt from 'jsonwebtoken';
import { getUserByRefreshToken } from '../../database/queries/userQueries.js';

export const postRefreshToken = async (req, res) => {
  const authorization = req.headers['authorization']
  const refreshToken = authorization && authorization.split(' ')[1]

  try {
    const verifyRefresh = await getUserByRefreshToken(refreshToken);

    if (!verifyRefresh || verifyRefresh.length === 0) {
      return res.status(403).json({
        success: false,
        message: 'Invalid token!',
      });
    }
    console.log(process.env.JWT_ACCESS_TOKEN);

    //Create an accessToken using the data from the existing refreshToken
    const accessToken = jwt.sign({ id: req.user.id }, process.env.JWT_ACCESS_TOKEN, { expiresIn: '10m' });

    res.status(201).json({
      success: true,
      newAccessToken: accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error generating access token!',
    });
  }
};
