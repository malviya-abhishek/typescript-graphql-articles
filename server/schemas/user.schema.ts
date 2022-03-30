import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import db from "../models";
import { ArticleType } from "./article.schema";

// Types
export const UserType:any = new GraphQLObjectType({
  name: 'User',
  fields: ()=>{
    return {
      id: {type: GraphQLID},
      name: {type: GraphQLString},
      email: {type: GraphQLString},
      articles:{
        type: new GraphQLList(ArticleType),
        resolve(parent, args){
          return db.Article.findAll({where: {userId: parent.id}});
        }
      }
    }
  }
});

export const UserLoginType = new GraphQLObjectType({
  name: 'UserLogin',
  fields: ()=>{
    return {
      id: {type: GraphQLID},
      token: {type: GraphQLString}
    }
  }
});

export const UserDeleteType = new GraphQLObjectType({
  name: 'UserDelete',
  fields: ()=>{
    return {
      msg: {type: GraphQLString}
    }
  }
});

// Args
export const UserArgs = {
  id: {type: new GraphQLNonNull(GraphQLID)}
};

export const AddUserArgs = {
    name: {type: new GraphQLNonNull(GraphQLString)},
    email: {type: new GraphQLNonNull(GraphQLString)},
    password: {type: new GraphQLNonNull(GraphQLString)}
};

export const UserLoginArgs = {
  email: {type: new GraphQLNonNull(GraphQLString)},
  password: {type: new GraphQLNonNull(GraphQLString)}
};

export const UpdateUserArgs = {
  id: {type: new GraphQLNonNull(GraphQLID)},
  token: {type: new GraphQLNonNull(GraphQLString)},
  name: {type: GraphQLString},
  password: {type: GraphQLString}
}

export const DeleteUserArgs = {
  id: {type: new GraphQLNonNull(GraphQLID)},
  token: {type: new GraphQLNonNull(GraphQLString)},
}