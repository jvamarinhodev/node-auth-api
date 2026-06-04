import jwt from 'jsonwebtoken';

export const authorization = (req, res, next) => {
  const authorization = req.headers['authorization'];
  const token = authHeaders && authHeaders.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied!',
    });
  }

  try {
    const secretKey = process.env.JWT_ACCESS_TOKEN;

    const user = jwt.verify(token, secretKey);

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: 'Invalid Token!',
    });
  }
};
