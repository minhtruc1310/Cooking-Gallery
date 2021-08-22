import React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from '../../config/firebase';


const PostCard = (props: any) => {
    const {post} = props;
    let history = useHistory();

    useEffect(() => {
        firebase.storage().ref().child(`Images/${post.id}`).getDownloadURL().then(function(url) {
            let element: HTMLImageElement; /* Defining element */
            const myElement: HTMLElement | null = document.getElementById(post.id);
    
            element = document.createElement('img'); 
            element.src = url;
            myElement?.appendChild(element);
            return;
        });
    },[])

    function handleClick() {
        history.push(`/posts/${post.id}`);
    }

    function TextAbstract(text: any, length: any) {
        if (text == null) {
            return "";
        }
        if (text.length <= length) {
            return text;
        }
        text = text.substring(0, length);
        text = text.substring(0, text.lastIndexOf(" "));
        return text + "...";
    }    

    return (
        <div className="d-item" id={post.id}  onClick={handleClick}>
            <h1>{post.name}</h1>
            <h4>Prices: {post.prices}</h4>
            <h4>Location: {post.location}</h4>
            <h4>Description: {TextAbstract(post.description, 25)}</h4>
            <h4>Upload by: {post.user}</h4>
        </div>
    );
};

export default PostCard;