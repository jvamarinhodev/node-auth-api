export const attachToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  console.log(token);

  if (!token) {
    res.redirect('/login');
  }

  req.accessToken = token;
  next();
};
