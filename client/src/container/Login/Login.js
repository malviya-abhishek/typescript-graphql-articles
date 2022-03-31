import { useState } from "react";
import Form from '../../component/Form/Form';
import axios from "../../axios";
import {useNavigate} from 'react-router-dom'
import { emailValidate } from "../../services/email.services";
import { LOGIN_USER } from "../../queries/queries";
import { useMutation } from "@apollo/client";

function Login(props){
  const [loginMutation] = useMutation(LOGIN_USER);


  const navigate = useNavigate(); 
  const [detail, setDetail] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  function changeHandler(e) {
      const name = e.target.name;
      const value = e.target.value;
      setDetail({ ...detail, [name] : value });
  }

  function uploadHandler(e) {
    e.preventDefault();

    let errorMsg = "";

    if(detail.email.length === 0 || emailValidate(detail.email) === false  )
      errorMsg += "Wrong email format";
    
    if(errorMsg.length){
      setError(errorMsg);
      return;
    }

    loginMutation({variables: {email: detail.email, password: detail.password}}).
      then((result)=>{
        const t = result.data.loginUser;
        console.log(t);
        props.setLogged(true);
        props.setToken(t.token);
        props.setUserId(t.id);
        localStorage.setItem("token", t.token);
        localStorage.setItem("userId", t.id);
        navigate("/");
      }).catch((error)=>{
        setError(JSON.stringify(error))
      });
  }


  const options = {
    formTitle: "Login",
    errorMsg: error,
    changeHandler: changeHandler,
    uploadHandler: uploadHandler,
    btnText: "Login",
    formFields: [
      {
        type: "email",
        name: "email",
        value: detail.email,
        placeholder: "Email",
      },
      {
        type: "password",
        name: "password",
        value: detail.password,
        placeholder: "Password",
      },
    ],
  };

        
  return  <Form {...options} />;
        
}


export default Login;
