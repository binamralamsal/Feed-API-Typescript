import jwt from "jsonwebtoken";
import config from "../config";
import { DataStoredInToken } from "../interfaces/auth.interface";

const generateToken = (data: DataStoredInToken) => {
  return jwt.sign(data, config.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export default generateToken;
