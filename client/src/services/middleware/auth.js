export const attachToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (token) {
    req.authHeader = `Bearer ${token}`;
  }

  next();
};
