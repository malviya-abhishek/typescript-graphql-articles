import { GraphQLObjectType, GraphQLSchema, GraphQLList } from 'graphql';
import { AddArticleResolve, ArticleResolve, ArticlesResolve, UpdateArticleResolve, DeleteArticleResolve } from '../resolves/article.resolve';
import { AddUserResolve, UsersResolve, UserLoginResolve, UserResolve, UpdateUserResolve, DeleteUserResolve } from '../resolves/user.resolve';
import { AddArticleArgs, ArticleArgs, ArticleType, UpdateArticleArgs, DeleteArticleArgs, ArticleDeleteType } from './article.schema';
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
    },
    article:{
      type: ArticleType,
      args: ArticleArgs,
      resolve: ArticleResolve
    },
    articles:{
      type: new GraphQLList(ArticleType),
      resolve: ArticlesResolve
    }
  }
});

const Mutation = new GraphQLObjectType({
  name : "Mutation",
  fields : {
    // Users
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
    // Articles
    addArticle:{
      type: ArticleType,
      args: AddArticleArgs,
      resolve: AddArticleResolve
    },
    updateArticle:{
      type: ArticleType,
      args: UpdateArticleArgs,
      resolve: UpdateArticleResolve
    },
    deleteArticle:{
      type: ArticleDeleteType,
      args: DeleteArticleArgs,
      resolve: DeleteArticleResolve
    },
  }  
});


const schema = new GraphQLSchema({
  query: RootQuery,
  mutation : Mutation
})


export default schema;