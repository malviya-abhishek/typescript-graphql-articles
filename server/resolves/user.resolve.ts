import db from "../models";
import crypto from 'crypto';

export const UserResolve = (parents: any, args: any)=>{
  return db.User.findOne({ where: { id: args.id }, attributes: { exclude: ['password', "updatedAt", "createdAt"]} });
}

export const UsersResolve = (parents: any, args: any)=>{
  return db.User.findAll({ attributes: { exclude: ['password', "updatedAt", "createdAt"]} });
}

export const AddUserResolve = (parent: any, args: any)=>{
  const hashedPassword = crypto.pbkdf2Sync(args.password, "salt", 10000, 100, 'sha512').toString('hex');
  args.password = hashedPassword;
  return db.User.create({...args});
}

export const UserLoginResolve = async (parent: any, args: any)=>{
    try {
      const user = await db.User.findOne({where: {email: args.email}});
      if(!user || user.validPassword(args.password) === false)
        return "Wrong password";
      return { token: user.generateJWT(), id: user.id};
    } catch (error) {
      return error
    }
}