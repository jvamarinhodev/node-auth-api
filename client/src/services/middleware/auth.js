export const attachToken = (req, res, next) => {
  const token = req.cookies.accessToken;


  if (!token) {
    res.redirect('/login');
  }

  req.accessToken = token;
  next();
};
