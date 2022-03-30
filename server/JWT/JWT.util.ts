import * as jwt from "jsonwebtoken";
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET as string;

export const validJWT = (token : string, id : string|number) : jwt.JwtPayload  =>{
  let JWT:jwt.JwtPayload;
  try{
    JWT = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    if(JWT.id != id)
      throw new Error("Invalid token");
  }
  catch(error){
    throw error
  }
  return JWT;
}