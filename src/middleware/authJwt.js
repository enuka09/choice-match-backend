const { expressjwt: jwt } = require("express-jwt");

function authJwt() {
  const secret = process.env.SECRET_KEY;
  const api = process.env.API_URL;
  return jwt({
    secret,
    algorithms: ["HS256"],
  }).unless({
    path: [
      `${api}/users/login`,
      `${api}/users/register`,
      `${api}/products/find-all`,
      `${api}/main-categories/find-all`,
      `${api}/sub-categories/find-all`,
      `${api}/brands/find-all`,
    ],
  });
}

module.exports = authJwt;
