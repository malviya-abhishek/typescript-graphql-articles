import { useState, useEffect } from "react";
import Form from '../../component/Form/Form';
import {useNavigate} from 'react-router-dom'
import { useMutation } from "@apollo/client";
import { CREATE_ARTICLE } from "../../queries/queries";

function CreateArticle(props){
  const navigate = useNavigate(); 
  const [detail, setDetail] = useState({ title: "", content: "" });
  const [error, setError] = useState("");
  const [createArticle] = useMutation(CREATE_ARTICLE);

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

      createArticle({variables: {id: props.userId, token: props.token, title: detail.title, content: detail.content }})
        .then( result => {
          const t = result.data.addArticle.id;
          navigate(`/articles/${t}`);
        })
        .catch( error => {
          setError(JSON.stringify(error));
        })
  }

  const options = {
    formTitle: "Create Form",
    errorMsg: error,
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


export default CreateArticle;




