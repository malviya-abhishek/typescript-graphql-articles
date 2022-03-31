import {useLocation} from 'react-router-dom'
import classes from './Article.module.css'
import Button from '../../component/Button/Button';
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_ARTICLE, GET_ARTICLE } from '../../queries/queries';

function Article(props){
    const articleId = useLocation().pathname.split("/")[2];
    const navigate = useNavigate();

    const { loading, error, data } = useQuery(GET_ARTICLE, { variables: { id: articleId } });
    const [deleteArticleMutation] = useMutation(DELETE_ARTICLE); 
    
    function deleteArticle(){
      deleteArticleMutation({variables: {id: articleId, userId: props.userId, token: props.token  }})
        .then(result=>{
          navigate("/")
        })
        .catch( error => {
          console.log(error);
        })
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
