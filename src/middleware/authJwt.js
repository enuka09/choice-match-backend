const { expressjwt: jwt } = require("express-jwt");

function authJwt() {
  const secret = process.env.SECRET_KEY;
  const api = process.env.API_URL;
  return jwt({
    secret,
    algorithms: ["HS256"],
  }).unless({
    path: [
      `${api}/test-api`,
      `${api}/users/login`,
      `${api}/users/register`,
      `${api}/products/find-all`,
      `${api}/main-categories/find-all`,
      `${api}/sub-categories/find-all`,
      `${api}/brands/find-all`,
      `${api}/products/find-all-featured`,
      "api/v1/products/find-all-featured",

      // Remove Later
      { url: /\/api\/v1\/products\/.*/, methods: ["GET", "POST", "DELETE", "PUT"] },
      { url: /\/api\/v1\/main-categories\/.*/, methods: ["GET", "POST", "DELETE", "PUT"] },
      { url: /\/api\/v1\/sub-categories\/.*/, methods: ["GET", "POST", "DELETE", "PUT"] },
      { url: /\/api\/v1\/brands\/.*/, methods: ["GET", "POST", "DELETE", "PUT"] },
      { url: /\/api\/v1\/orders\/.*/, methods: ["GET", "POST", "DELETE", "PUT"] },
    ],
  });
}

module.exports = authJwt;
