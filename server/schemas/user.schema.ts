import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

// Types
export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: ()=>{
    return {
      id: {type: GraphQLID},
      name: {type: GraphQLString},
      email: {type: GraphQLString},
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
})

      // resolve: UserLoginResolve

// Args
export const UserArgs = {
  id: {type: new GraphQLNonNull(GraphQLID)}
}

export const AddUserArgs = {
    name: {type: new GraphQLNonNull(GraphQLString)},
    email: {type: new GraphQLNonNull(GraphQLString)},
    password: {type: new GraphQLNonNull(GraphQLString)}
}

export const UserLoginArgs = {
  email: {type: new GraphQLNonNull(GraphQLString)},
  password: {type: new GraphQLNonNull(GraphQLString)}
}