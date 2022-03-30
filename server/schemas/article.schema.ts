import { GraphQLID, GraphQLObjectType, GraphQLString, GraphQLNonNull } from "graphql";
import db from "../models";
import { UserType } from "./user.schema";

export const ArticleType:any = new GraphQLObjectType({
  name: 'Article',
  fields: ()=>{
    return {
      id: {type: GraphQLID},
      title: {type: GraphQLString},
      content: {type: GraphQLString},
      user:{
        type: UserType,
        resolve(parent, args){
          return  db.User.findByPk(parent.userId,{ attributes: { exclude: ['password', "updatedAt"]}});
        }
      }
    }
  }
});

export const ArticleDeleteType = new GraphQLObjectType({
  name: 'ArticleDelete',
  fields: ()=>{
    return {
      msg: {type: GraphQLString}
    }
  }
});


// Args
export const ArticleArgs = {
  id: {type: new GraphQLNonNull(GraphQLID)}
};
export const AddArticleArgs = {
    title: {type: new GraphQLNonNull(GraphQLString)},
    content: {type: new GraphQLNonNull(GraphQLString)},
    userId: {type: new GraphQLNonNull(GraphQLID)},
    token: {type: new GraphQLNonNull(GraphQLString)}
}

export const UpdateArticleArgs = {
  id:{type: new GraphQLNonNull(GraphQLID)},
  title: {type: GraphQLString},
  content: {type: GraphQLString},
  userId: {type: new GraphQLNonNull(GraphQLID)},
  token: {type: new GraphQLNonNull(GraphQLString)}
}

export const DeleteArticleArgs = {
  id: {type: new GraphQLNonNull(GraphQLID)},
  userId: {type: new GraphQLNonNull(GraphQLID)},
  token: {type: new GraphQLNonNull(GraphQLString)},
}