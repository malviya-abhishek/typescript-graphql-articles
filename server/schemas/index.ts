import { GraphQLObjectType, GraphQLSchema, GraphQLNonNull, GraphQLString, GraphQLList } from 'graphql';
import { AddUserResolve, UsersResolve, UserLoginResolve, UserResolve } from '../resolves/user.resolve';
import {UserType, AddUserArgs, UserLoginType, UserLoginArgs, UserArgs} from './user.schema'


const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user:{
      type: UserType,
      args: UserArgs,
      resolve: UserResolve
    },
    users:{
      type: new GraphQLList(UserType),
      resolve: UsersResolve
    }
  }
});

const Mutation = new GraphQLObjectType({
  name : "Mutation",
  fields : {
    addUser:{
      type: UserType,
      args: AddUserArgs,
      resolve: AddUserResolve
    },
    loginUser:{
      type: UserLoginType,
      args: UserLoginArgs,
      resolve: UserLoginResolve
    }
  }  
});


const schema = new GraphQLSchema({
  query: RootQuery,
  mutation : Mutation
})


export default schema;