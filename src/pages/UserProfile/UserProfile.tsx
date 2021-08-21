import React from 'react';
import AppHeader from '../../components/Header/Header';
import {Layout} from 'antd';
import Bio from '../../components/Bio/Bio';
import ProfilePosts from '../../components/ProfilePosts/ProfilePosts';

const { Footer, Content } = Layout;

const UserProfile = () => {

    return (
        <Layout style={{ minHeight: '100vh' }}>
        <AppHeader/>
        <Content >
          <div className="profile-menu">
            <Bio></Bio>
            <ProfilePosts></ProfilePosts>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>&copy; {new Date().getUTCFullYear()} CoderMinhChuc</Footer>
      </Layout>
    );
};

export default UserProfile;