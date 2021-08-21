import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Radio } from 'antd';
import AuthContainer from '../../components/AuthContainer/AuthContainer';
import { auth } from '../../config/firebase';
import logging from '../../config/logging';
import IPageProps from '../../interfaces/page';

const LogoutPage: React.FunctionComponent<IPageProps> = props => {
    const history = useHistory();

    const Logout = () => {
        auth.signOut()
        .then(() => history.push('/login'))
        .catch(error => logging.error(error));
    }

    return (
        <AuthContainer header="">
            <div className='text-center' style={{textAlign: 'center', padding: '20%'}}>
                <p className='text-center'>Are you sure you want to logout?</p>
                <Button value="large" onClick={() => history.goBack()}>Go Back</Button>
                <Button type="primary" danger onClick={() => Logout()}>Logout</Button>
            </div>
        </AuthContainer>
    );
}

export default LogoutPage;