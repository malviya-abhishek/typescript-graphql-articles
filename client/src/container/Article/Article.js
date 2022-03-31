import {useLocation} from 'react-router-dom'
import {useEffect, useState} from 'react';
import axios from '../../axios'
import classes from './Article.module.css'
import Button from '../../component/Button/Button';
import { useNavigate } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { GET_ARTICLE } from '../../queries/queries';

function Article(props){
    const articleId = useLocation().pathname.split("/")[2];
    const navigate = useNavigate();

    const { loading, error, data } = useQuery(GET_ARTICLE, { variables: { id: articleId } });

    
    function deleteArticle(){
      axios
        .delete(`/articles/${articleId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((result) => {
          navigate("/");
        })
        .catch((err) => {
          console.log(err.response.data.error);
        });
    }

    if(loading)
      return <p> Loading </p>

    if(error)
      return <p> Something went wrong </p>


    if(data){
      return (
        <div className={classes["Article"]}>
        <div className={classes["title"]}> {data.article.title} </div>
        <div className={classes["content"]}> {data.article.content} </div>
        { 
          props.userId === data.article.user.id ? 
          <div className={classes["btn-holder"]}>
            <Button  onClickHandler={deleteArticle} > Delete </Button>
            <Button green={true} onClickHandler={()=>{
              navigate(`/articles/${articleId}/edit`, { state: { toEdit : true, articleId: articleId }} );
            }} > Edit </Button>
          </div> 
          : null 
        }
      </div>
      )
    }
};


export default Article;
