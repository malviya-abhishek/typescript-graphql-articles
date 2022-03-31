import { gql } from "@apollo/client";



export const CREATE_USER = gql`
mutation CreateUser($name: String! $email: String! $password: String!){
  addUser(name: $name email: $email password: $password ){
    id
    token
  }
}
`;

export const LOGIN_USER = gql`
mutation LoginUser($email: String! $password: String!){
  loginUser(email: $email password: $password){
    id
    token
  }
}
`;

export const GET_USER = gql`
query GetUser($id: ID!){
  user(id: $id){
    id
    name
    articles{
      id
      title
      content
    }
  }
}
`;

export const UPDATE_USER = gql`
mutation UpdateUser($id: ID! $token: String! $name: String $password: String){
  updateUser(
    id: $id
    token: $token
    name: $name
    password: $password
  ){
    id
    name
    email
  }
}
`;

export const DELETE_USER = gql`
mutation DeleteUser($id: ID! $token: String!){
  deleteUser(
    id: $id
    token: $token
  ){
    msg    
  }
}
`;




export const GET_ARTICLES = gql`
query GetArticles{
  articles{
    id
    title
    content
  }
}
`;

export const GET_ARTICLE = gql`
query GetArticle($id: ID!){
  article(id: $id){
    id
    title
    content
    user{
      id
      name
      email
    }
  }
}
`;

export const CREATE_ARTICLE = gql`
mutation CreateArticle($id: ID! $token: String! $title: String! $content: String!){
  addArticle(
      userId: $id
      token: $token
      title: $title
      content: $content
  ){
      id 
      title
      content
      user{
          id
          name
          email
      }
  }
}
`;


export const UPDATE_ARTICLE = gql`
mutation UpdateArticle($id: ID! $userId: ID! $token: String! $title: String $content: String){
  updateArticle(
      id: $id
      userId: $userId
      token: $token
      title: $title
      content: $content
  ){
      id 
      title
      content
      user{
          id
          name
          email
      }
  }
}
`;

export const DELETE_ARTICLE = gql`
mutation DeleteArticle($id: ID! $userId: ID! $token: String!){
  deleteArticle(
    id: $id
    userId: $userId
    token: $token
  ){
    msg
  }
}
`;