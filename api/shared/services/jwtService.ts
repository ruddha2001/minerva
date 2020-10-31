import * as jwt from "jsonwebtoken";

export const signJwt = async (payload: {}, options?: {}) => {
  return await jwt.sign(payload, process.env.JWT_SECRET!, options);
};

export const verifyJwt = async (token: string) => {
  return await jwt.verify(token, process.env.JWT_SECRET!);
};
