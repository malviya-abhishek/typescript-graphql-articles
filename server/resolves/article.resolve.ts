import { validJWT } from "../JWT/JWT.util";
import db from "../models";

export const ArticleResolve = (parents: any, args: any)=>{
  return db.Article.findByPk(args.id);
}

export const ArticlesResolve = (parent: any, args: any)=>{
  return db.Article.findAll();
}

export const AddArticleResolve = (parent: any, args: any)=>{
  try{
    validJWT(args.token, args.userId);
    const newBook = {
      userId: args.userId,
      title: args.title,
      content: args.content
    }
    return db.Article.create(newBook);
  }catch(error){return error;}
}

export const UpdateArticleResolve = async(parent: any, args: any)=>{
  try{
    validJWT(args.token, args.userId);
    const article = await db.Article.findByPk(args.id);
    if(!article)
      throw new Error("Article does not exist");
    if(article.userId != args.userId)
      throw new Error("Invalid user")
    const updateArticle:any = {};
    if(args.title) updateArticle.title = args.title;
    if(args.content) updateArticle.content = args.content;
    await db.Article.update(updateArticle, {where: {id: args.id}});
    return db.Article.findByPk(args.id);
  }catch(error){return error;}
}

export const DeleteArticleResolve = async (parent: any, args: any)=>{
  try{
    validJWT(args.token, args.userId);
    const article = await db.Article.findByPk(args.id);
    if(!article)
      throw new Error("Article does not exist");
    if(article.userId != args.userId)
      throw new Error("Invalid user")
    await db.Article.destroy({where: {id : args.id}});
    return {msg: "Article deleted"};
  }catch(error){return error;}
}