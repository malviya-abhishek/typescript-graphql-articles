import { GraphQLObjectType, GraphQLSchema, GraphQLList } from 'graphql';
import { AddUserResolve, UsersResolve, UserLoginResolve, UserResolve, UpdateUserResolve, DeleteUserResolve } from '../resolves/user.resolve';
import {UserType, AddUserArgs, UserLoginType, UserLoginArgs, UserArgs, UpdateUserArgs, UserDeleteType, DeleteUserArgs} from './user.schema'


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
    updateUser:{
      type: UserType,
      args: UpdateUserArgs,
      resolve: UpdateUserResolve
    },
    deleteUser:{
      type: UserDeleteType,
      args: DeleteUserArgs,
      resolve: DeleteUserResolve
    },
    loginUser:{
      type: UserLoginType,
      args: UserLoginArgs,
      resolve: UserLoginResolve
    },
  }  
});


const schema = new GraphQLSchema({
  query: RootQuery,
  mutation : Mutation
})


export default schema;