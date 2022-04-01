import db from "../models";
import crypto from 'crypto';
import { validJWT } from "../JWT/JWT.util";
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET as string;

export const UserResolve = (parents: any, args: any)=>{
  return db.User.findByPk(args.id,{ attributes: { exclude: ['password', "updatedAt"]}});
}

export const UsersResolve = (parents: any, args: any)=>{
  return db.User.findAll({ attributes: { exclude: ['password', "updatedAt", "createdAt"]} });
}

export const AddUserResolve = async (parent: any, args: any)=>{
  const hashedPassword = crypto.pbkdf2Sync(args.password, "salt", 10000, 100, 'sha512').toString('hex');
  args.password = hashedPassword;
  const user =  await db.User.create({...args});
  user.token = user.generateJWT();
  return user;
}

export const UpdateUserResolve = async (parent: any, args: any)=>{
  try{
    const user = await db.User.findByPk(args.id,{ attributes: { exclude: ['password', "updatedAt"]}});
    if(!user)
      throw new Error("User does not exist");
    validJWT(args.token, args.id);
    if(args.password)
      args.password = crypto.pbkdf2Sync(args.password, "salt", 10000, 100, 'sha512').toString('hex');
    await db.User.update(args, {where: {id: args.id}});
    return db.User.findByPk(args.id);
  }catch (error) { return error;}
}

export const DeleteUserResolve = async (parent: any, args: any)=>{
  try{
    const user = await db.User.findByPk(args.id, { attributes: { exclude: ['password', "updatedAt"]}});
    if(!user)
      throw new Error("User does not exist");
    validJWT(args.token, args.id);
    await db.User.destroy( {where: {id : args.id} , cascade: true });
    return {msg: "User deleted"};
  }catch(error){return error;}
}

export const UserLoginResolve = async (parent: any, args: any)=>{
  try {
    const user = await db.User.findOne({where: {email: args.email}});
    if(!user || user.validPassword(args.password) === false)
    throw new Error("Wrong email or password");
    return { token: user.generateJWT(), id: user.id};
  } catch (error) { return error}
}