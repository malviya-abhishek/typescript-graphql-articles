import { useState, useEffect } from "react";
import Form from "../../component/Form/Form";
import axios from "../../axios";
import {useNavigate} from 'react-router-dom';
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER, UPDATE_USER } from "../../queries/queries";

function EditProfile(props){
    const navigate = useNavigate();
    const [detail, setDetail] = useState({ name: "", password: ""});
    const [Error, setError] = useState("");

    const { loading, error, data } = useQuery(GET_USER, { variables: { id: props.userId } });
    const [userUpdateMutation] = useMutation(UPDATE_USER);

    if(error){
      console.log(error);
    }

    if(data){
      if(detail.name.length === 0 )
        setDetail({name: data.user.name, password: ""});
    }

    
    function changeHandler(e) {
        const name = e.target.name;
        const value = e.target.value;
        setDetail({ ...detail, [name]: value });
    }

    function uploadHandler(e) {
        e.preventDefault();
        const data = { name: detail.name};

        if(detail.password.length)
            data["password"] = detail.password

      
        userUpdateMutation({variables: {id: props.userId, token: props.token, ...data }})
          .then((result) => {
            navigate(-1);
          })
          .catch((err) => {
            setError("Something went wrong")
            console.log(err.response);
          });
    }

    const options = {
        formTitle: "Update profile",
        errorMsg: Error,
        changeHandler: changeHandler,
        uploadHandler: uploadHandler,
        btnText: "update",
        formFields: [
        {
            type: "name",
            name: "name",
            value: detail.name,
            placeholder: "Name",
        },
        {
            type: "password",
            name: "password",
            value: detail.password,
            placeholder: "Password",
        },
        ],
    };

    return <Form {...options} />;
}


export default EditProfile;
