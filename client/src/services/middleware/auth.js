export const attachToken = (req, res, next) => {
  const token = req.cookies.accessToken;


  if (!token) {
    return res.redirect('/login');
  }

  req.accessToken = token;
  next();
};
