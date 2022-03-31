import { useQuery } from '@apollo/client';

import { GET_ARTICLES } from '../../queries/queries';
import ArticlePreview from "../../component/ArticlePreview/ArticlePreview";

function ArticlePallet(props){
    const { loading, error, data } = useQuery(GET_ARTICLES);

    if(error)
      return <p> Error </p>

    if(loading)
      return <p> Loading </p>

    if(data)
      return (
        data.articles.map( article => 
          <ArticlePreview 
            key = {article.id} 
            title = {article.title} 
            content = {article.content}
            id = {article.id}
          />
        ));
}


export default ArticlePallet;