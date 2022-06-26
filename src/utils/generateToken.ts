import jwt from "jsonwebtoken";
import config from "../config";

const generateToken = (object: {}) => {
  return jwt.sign(object, config.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export default generateToken;
