import jwt from 'jsonwebtoken';

export const authorization = (secretKey) => (req, res, next) => {
  const authorization = req.headers['authorization'];
  const token = authorization && authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied!',
    });
  }

  try {
    const user = jwt.verify(token, secretKey);

    req.user = user;

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired. Please log in again!',
      });
    }
    return res.status(403).json({
      success: false,
      error: 'Invalid Token!',
    });
  }
};
