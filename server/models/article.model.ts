'use strict';
import { Model } from 'sequelize';

interface ArticleAttributes{
  id: number;
  title: string;
  content: string;
  userId: number
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Article extends Model<ArticleAttributes> implements ArticleAttributes {
    
    id!: number;
    title!: string;
    content!: string;
    userId!: number;

    static associate(models: any) {
      Article.belongsTo(models.User, {onDelete: "cascade"});
    }

    validUser(userId: number) : boolean{
      return this.userId === userId;
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
    userId: {
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