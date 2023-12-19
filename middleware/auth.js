import jwtPkg from "jsonwebtoken";
const { verify } = jwtPkg;

const auth = (req, res, next) => {
  console.log(req.cookies);

  const token = req.cookies.accessToken;
  if (token != null || token != undefined) {
    if (!verify(token, "jwt-private-key")) {
      return res.redirect("/login");
    }
    next();
    return;
  }
  return res.redirect("/login");
};

export default auth;
