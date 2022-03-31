import { useState } from "react";
import Form from "../../component/Form/Form";
import {useNavigate} from 'react-router-dom';
import { emailValidate } from "../../services/email.services";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../queries/queries";

function Signup(props) {
  const [signupMutation] = useMutation(CREATE_USER);

  const navigate = useNavigate(); 
  const [detail, setDetail] = useState({ name: "", email: "", password: ""  });
  const [error, setError] = useState("");

  function changeHandler(e) {
    const name = e.target.name;
    const value = e.target.value;
    setDetail({ ...detail, [name]: value });
  }

  function uploadHandler(e) {
    e.preventDefault();

    let errorMsg = "";

    if(detail.name.length === 0)
      errorMsg += "Name Missing | ";

    if(detail.email.length === 0 || emailValidate(detail.email) === false   )
      errorMsg += "| Wrong email format | ";
    
    if(detail.password.length < 8 )
      errorMsg += "Password to small";
    
    if(errorMsg.length){
      setError(errorMsg);
      return;
    }


    signupMutation({variables: {name: detail.name, email: detail.email, password: detail.password}}).
      then((result)=>{
        const t = result.data.addUser;
        props.setLogged(true);
        props.setToken(t.token);
        props.setUserId(t.id);
        localStorage.setItem("token", t.token);
        localStorage.setItem("userId", t.id);
        navigate("/");
      }).catch((error)=>{
        console.log(error);
      });
  }

  const options = {
    formTitle: "Sign Up",
    errorMsg: error,
    changeHandler: changeHandler,
    uploadHandler: uploadHandler,
    btnText: "Sign Up",
    formFields: [
      {
        type: "name",
        name: "name",
        value: detail.name,
        placeholder: "Name",
      },
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

export default Signup;
