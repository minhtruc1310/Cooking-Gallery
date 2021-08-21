import React, { useState } from 'react';
import { Row, Col, Button, Typography } from 'antd';
import { auth, googleProvider } from '../../config/firebase';
import { useHistory } from 'react-router-dom';
import logging from '../../config/logging';

const {Title} = Typography;

const buttonStyle = {
  width: '100%',
  border: '#cf4333',
  background: '#cf4333',
  color: 'white',
  height: '6vh',
  'border-radius': '5px',
  'font-size': '16px',
  'font-weight': 'bolder',
  'font-family': 'Quicksand'
};

const img = {
    margin: '0px 10px 2px 0px',
    width: '5%'
};


const Login = () => {
    const history = useHistory();
    const [authenticating, setAuthenticating] = useState<boolean>(false);

    const GoogleLogin = () => {

        setAuthenticating(true);

        auth.signInWithPopup(googleProvider)
        .then(result => {
            logging.info(result);
            history.push('/');
        })
        .catch(error => {
            logging.error(error);
            setAuthenticating(false);
        });
    }

    auth.onAuthStateChanged((user) => {
        console.log(user);
    })
    
    return (
        <div style={{position: "absolute", width: "100%", top: "30%"}}>
            <Row justify="center">
                <Col span={8}>
                    <Title style={{textAlign: "center", fontFamily: "cursive", top: "50px", color: "whitesmoke"}}>Cooking Gallery</Title>
                    <Button disabled={authenticating} style={buttonStyle} onClick={GoogleLogin}><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/480px-Google_%22G%22_Logo.svg.png" style={img}/>Login with Google</Button>
                </Col>
            </Row>
        </div>
    );
};

export default Login;