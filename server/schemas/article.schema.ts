import { GraphQLID, GraphQLObjectType, GraphQLString, GraphQLNonNull } from "graphql";
import { UserType } from "./user.schema";

export const ArticleType = new GraphQLObjectType({
  name: 'User',
  fields: ()=>{
    return {
      id: {type: GraphQLID},
      title: {type: GraphQLString},
      content: {type: GraphQLString},
      user:{
        type: UserType,
        resolve(parent, args){
          
        }
      }
    }
  }
});

// Args
export const AddArticleArgs = {
    title: {type: GraphQLString},
    content: {type: GraphQLString},
    userId: {type: GraphQLString}
}