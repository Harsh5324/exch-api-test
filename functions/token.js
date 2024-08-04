const jwt = require("jsonwebtoken");

const key =
  "UwSK1zEaX1F4PmPncjdnnGYGGGYXCD55567S7D7HBCDSHBDSHBDS$$$$Ry14wcIP9yn93x7J";

const generateToken = (data) =>
  jwt.sign(data, key, { expiresIn: "365000000000000000000000000days" });

const authenticate = async (req, resp) =>
  new Promise((resolve, reject) => {
    const token = req.headers.authorization;

    if (!token) return resp.send({ status: "FAILED", msg: "Token not found" });

    jwt.verify(token.split(" ")[1], key, (err, decoded) => {
      if (err) {
        return reject({ status: "FAILED", msg: "Invalid token" });
      } else {
        req.user = decoded._id;
        return resolve(decoded._id);
      }
    });
  });

module.exports = { generateToken, authenticate };
