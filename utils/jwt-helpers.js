const jwt = require("jsonwebtoken");

exports.jwtTokens = ({ user_id, user_email }) => {
  const user = { id: user_id, mail: user_email };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30d",
  });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "100d",
  });
  return { accessToken, refreshToken };
};
