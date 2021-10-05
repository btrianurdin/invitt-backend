import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongoose';
import Config from '../config';

interface ICreateToken {
  _id?: ObjectId;
  email?: string;
  fullname?: string;
};

export const createToken = async (_payload: ICreateToken) => {
  try {
    const token = jwt.sign({..._payload}, Config.jwtTokenKey, {expiresIn: "7d"});

    return token;
  } catch (err: any) {
    throw new Error(err?.message);
  }
}

export const verifyToken = (_token: string) => {
  return jwt.verify(_token, Config.jwtTokenKey);
}