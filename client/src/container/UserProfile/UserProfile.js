import axios from '../../axios';
import ArticlePreview from '../../component/ArticlePreview/ArticlePreview';
import Button from '../../component/Button/Button'
import classes from './UserProfile.module.css'
import {  useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_USER, GET_USER } from '../../queries/queries';

function UserProfile(props){
    const navigate = useNavigate();
    const { loading, error, data } = useQuery(GET_USER, { variables: { id: props.userId } });
    
    function editProfile(){
        navigate("/profile/edit");
    }

    const [deleteUserMutation] = useMutation(DELETE_USER);

    function deleteProfile(){
      deleteUserMutation({variables: {id: props.userId, token: props.token }})  
        .then( (result)=>{
          navigate("/logout");
        })
        .catch( (err)=>{
            console.log(err);
        })  
    }

    return (
      <div>
        <div className={classes["heading"]} >
          <h2 className={classes["username"]}> Hi {data?.user.name}! </h2>
          <Button onClickHandler={ ()=> {deleteProfile()} }> Delete Profile </Button>
          <Button onClickHandler={ ()=> {editProfile()} }> Edit Profile </Button>
        </div>
        {data?.user.articles.map((article)=>(
          <ArticlePreview
            key={article.id}
            title={article.title}
            content={article.content}
            id={article.id}
          />))}
      </div>
    );
}


export default UserProfile;

