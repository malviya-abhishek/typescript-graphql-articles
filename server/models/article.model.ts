'use strict';
import { Model } from 'sequelize';

interface ArticleAttributes{
  id: number;
  title: string;
  content: string;
  UserId: number
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Article extends Model<ArticleAttributes> implements ArticleAttributes {
    
    id!: number;
    title!: string;
    content!: string;
    UserId!: number;

    static associate(models: any) {
      Article.belongsTo(models.User, {onDelete: "cascade"});
    }

    validUser(userId: number) : boolean{
      return this.UserId === userId;
    }

  }
  Article.init({
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title:{
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'Users',
        key: 'id'
      },
      onDelete: "CASCADE"
    }

  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};