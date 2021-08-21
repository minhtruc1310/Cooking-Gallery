import React from 'react';
import { Layout, Menu } from 'antd';
import '../../assets/css/Header.css'
import { useHistory } from 'react-router-dom';

const { Header } = Layout;

const items = [
    { key: '1', label: 'Cooking Gallery App', path: '/' },
    { key: '2', label: 'Upload your dish', path: '/upload' },
    { key: '3', label: 'Profile', path: '/profile' },
    { key: '4', label: 'Logout', path: '/logout' }
  ]

const AppHeader = () => {  
    const history = useHistory();

    function handleMenu(e: any) {
        const clicked = items?.find(_item => _item.key === e.key);
        history.push(clicked!.path);
    }

    return (
        <Header style={{ padding: 0, background: "white" }} >
            <Menu theme="dark" mode="horizontal" onClick={handleMenu} >
                {items.map((item) => (
                    <Menu.Item key={item.key}>{item.label}</Menu.Item>
                ))}
            </Menu>
        </Header>
    );
};

export default AppHeader;
