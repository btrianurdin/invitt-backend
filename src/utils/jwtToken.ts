import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongoose';
import Config from '../config';
import User, { IUserModel } from "../models/User"

interface ICreateToken {
  _id: ObjectId;
  email: string;
  fullname: string;
};

export const createAccessToken = async ({ _id, email, fullname }: ICreateToken) => {
  try {
    const accessToken = jwt.sign({
      _id,
      email,
      fullname
    }, Config.jwt.access_token_key, {expiresIn: "1d"});

    return accessToken;
  } catch (err: any) {
    throw new Error(err?.message);
  }
}

export const createRefreshToken = async ({ _id, email, fullname }: ICreateToken) => {
  try{
    const refreshToken = jwt.sign({_id, email, fullname}, Config.jwt.refresh_token_key, {expiresIn: "30d"});
    const usersUpdate = await User.findOneAndUpdate({ _id }, { refreshToken }, {new: true});
    
    return (usersUpdate as any).refreshToken;
  } catch(err: any) {
    throw new Error(err?.message);
    
  }
}