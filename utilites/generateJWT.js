const jwt = require("jsonwebtoken");

module.exports = async (payload) => {
  const token = await jwt.sign(
    { email: payload.email, id: payload._id, role: payload.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "40s" },
  );
  return token;
};
