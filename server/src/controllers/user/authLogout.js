import { postLogout, getUserByRefreshToken } from '../../database/queries/userQueries.js';

export const postLogoutUser = async (req, res) => {
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

    await postLogout(refreshToken);

    return res.status(200).json({
      success: true,
      message: 'Logout successful!',
    });
  } catch (error) {
    return res.status(500).json({ error: 'Server error', message: error.message });
  }
};
