import React, { useEffect, useState } from 'react';
import { auth } from '../../config/firebase';
import results from '../../config/results';
import PostCard from '../Post/PostCard';

const ProfilePosts = () => {
    const [profilePost, setProfilePost] = useState<any>([]);

    useEffect(() => {
      results.get('/Posts.json').then(res => {
          const fetch = [];
          for(let key in res.data){
            fetch.unshift({ ...res.data[key], id: key })  
          }
          setProfilePost(fetch);
      })
      
    },[])

    return (
        <div>
            <h1 style={{marginBottom: "2%", marginTop: "2%"}}>User Posts</h1>
            <div style={{padding:10, display: "flex", flexWrap: "wrap", textAlign: 'left'}}>
            {profilePost.map((value:any) => {
                if(value.user === auth.currentUser?.displayName){
                  return(
                    <PostCard key={value.id} post={value} />
                  )
                }
              })}
            </div>
        </div>
    );
};

export default ProfilePosts;