import { useState, useEffect } from "react";
import Form from '../../component/Form/Form';
import {useNavigate} from 'react-router-dom'
import { useLocation } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ARTICLE, UPDATE_ARTICLE } from "../../queries/queries";

function EditArticle(props){
  const navigate = useNavigate(); 
  const {state} = useLocation();
  const [detail, setDetail] = useState({ title: "", content: "" });
  const [Error, setError] = useState("");

  const [updateArticle] = useMutation(UPDATE_ARTICLE);

  const { loading, error, data } = useQuery(GET_ARTICLE, { variables: { id: state.articleId } }, []);

  if(data){
    if(detail.title.length == 0 && detail.content.length == 0)
    setDetail({
      title: data.article.title,
      content: data.article.content
    });
  }

  if(error)
    console.log(error);


  function changeHandler(e) {
      const name = e.target.name;
      const value = e.target.value;
      setDetail({ ...detail, [name] : value });
  }

  function uploadHandler(e) {
      e.preventDefault();
      let errorMsg = "";
      if(detail.title.length === 0)
        errorMsg += "Title is missing | ";
      
      if(detail.content.length === 0)
        errorMsg += "Content is missing ";
      
      if(errorMsg.length){
        setError(errorMsg);
        return;
      }
    
    updateArticle({variables: {id: state.articleId, token: props.token , userId: props.userId, title: detail.title, content: detail.content }})
      .then( result => {
        navigate(`/articles/${state.articleId}`);
      })
      .catch( error => {
        setError(JSON.stringify(error));
      });
  }

  const options = {
    formTitle: "Create Form",
    errorMsg: Error,
    changeHandler: changeHandler,
    uploadHandler: uploadHandler,
    btnText: "Post",
    formFields: [
      {
        type: "text",
        name: "title",
        value: detail.title,
        placeholder: "Title",
      },
      {
        type: "textarea",
        name: "content",
        value: detail.content,
        placeholder: "Article",
      },
    ],
  };

    return <Form { ...options } />
}


export default EditArticle;




