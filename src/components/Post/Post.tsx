import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import results from '../../config/results';
import './../../assets/css/Post.css'
import { RollbackOutlined} from '@ant-design/icons';
import firebase from 'firebase';


const Post = () => {
    const [aPostData, setAPostData] = useState<any>([]);
    const history = useHistory();
    const { id }:any = useParams();

    useEffect(() => {
        results.get('/Posts.json').then(res => {
            const curFetch = [];
            for(let key in res.data){
                curFetch.unshift({ ...res.data[key], id: key })
            }
            setAPostData(curFetch);
        })

        firebase.storage().ref().child(`Images/${id}`).getDownloadURL().then(function(url) {
            let element: HTMLImageElement; /* Defining element */
            const myElement: HTMLElement | null = document.getElementById(id);
    
            element = document.createElement('img'); 
            element.src = url;
            myElement?.appendChild(element);
            return;
        });
          
    }, [])

    function handleBack() {
        history.push('/');
    }

    return (
        <div>
            <div>
                {aPostData.map((value: any) => {
                    if(value.id === id){
                        return(
                            <div className="post">
                                <div className="post-div">
                                    <div className="post-wrap">
                                        <div className="post-img" id={value.id} >
                                            
                                        </div>

                                        <div className="post-content">
                                            <h1>{value.name}</h1>
                                            <h2>Prices: {value.prices}</h2>
                                            <h2>Location: {value.location}</h2>
                                            <h2>Description: {value.description}</h2>
                                            <h2>Upload by: {value.user}</h2>
                                            <Button icon={<RollbackOutlined />} onClick={handleBack}>Back</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                })}
                
            </div>
            
        </div>
    );
};

export default Post;
