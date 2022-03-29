import db from "../models";
import crypto from 'crypto';
import * as jwt from "jsonwebtoken";
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET as string;

export const UserResolve = (parents: any, args: any)=>{
  return db.User.findByPk(args.id,{ attributes: { exclude: ['password', "updatedAt"]}});
}

export const UsersResolve = (parents: any, args: any)=>{
  return db.User.findAll({ attributes: { exclude: ['password', "updatedAt", "createdAt"]} });
}

export const AddUserResolve = (parent: any, args: any)=>{
  const hashedPassword = crypto.pbkdf2Sync(args.password, "salt", 10000, 100, 'sha512').toString('hex');
  args.password = hashedPassword;
  return db.User.create({...args});
}

export const UpdateUserResolve = async (parent: any, args: any)=>{
  try{
    const user = await db.User.findByPk(args.id,{ attributes: { exclude: ['password', "updatedAt"]}});
    if(!user)
      return {};
    try {
      const JWT = jwt.verify(args.token, JWT_SECRET) as jwt.JwtPayload;
      if(JWT.id != args.id)
        throw new Error("Invalid token");
      if(args.password)
        args.password = crypto.pbkdf2Sync(args.password, "salt", 10000, 100, 'sha512').toString('hex');
      try {
        const updatedUser = await db.User.update(args, {where: {id: args.id}});
        return db.User.findByPk(args.id);
      } catch (error) {return error;}
    }catch(error){ return error;}
  }catch (error) { return error;}
}

export const DeleteUserResolve = async (parent: any, args: any)=>{
  try{
    const JWT = jwt.verify(args.token, JWT_SECRET) as jwt.JwtPayload;
    if(JWT.id != args.id)
      throw new Error("Invalid token");
    const deleted = db.User.destroy( {where: {id : args.id} , cascade: true });
    return {msg: "User deleted"}
  }catch(error){return error;}
}

export const UserLoginResolve = async (parent: any, args: any)=>{
  try {
    const user = await db.User.findOne({where: {email: args.email}});
    if(!user || user.validPassword(args.password) === false)
    throw new Error("Wrong email or password");
    return { token: user.generateJWT(), id: user.id};
  } catch (error) {
    return error
  }
}