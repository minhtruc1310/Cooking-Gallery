import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import results from '../../config/results';

const Post = () => {
    const [aPostData, setAPostData] = useState<any>([]);
    const history = useHistory();
    const id = useParams();

    useEffect(() => {
        results.get(`/Posts/${id}`).then(res => {
            const arrayData = res.data;
            console.log(arrayData)
            setAPostData(arrayData);
        })
    }, [])

    function handleBack() {
        history.push('/');
    }

    return (
        <div>
            <div>
                <h1>Name: </h1>
                <h1>Prices:  </h1>
                <button onClick={handleBack}>Back</button>
            </div>
            
        </div>
    );
};

export default Post;
