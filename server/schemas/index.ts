import { GraphQLObjectType, GraphQLSchema } from 'graphql';



const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    
  }
});

const Mutation = new GraphQLObjectType({
  name : "Mutation",
  fields : {}  
});


const schema = new GraphQLSchema({
  query: RootQuery,
  mutation : Mutation
})


export default schema;