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
      `${api}/products/find-all-featured`,
      `${api}/orders/create-payment`,
    ],
  });
}

module.exports = authJwt;
