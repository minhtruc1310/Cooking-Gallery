import IRoute from "../interfaces/route";

import Login from "../pages/Login/Login";
import LogoutPage from "../pages/Logout/Logout";
import Gallery from "../pages/Gallery/Gallery"; 
import UserProfile from "../pages/UserProfile/UserProfile";
import Upload from "../pages/Upload/Upload";
import Post from "../components/Post/Post";

const routes: IRoute[] = [
    
    {
        path: '/',
        exact: true,
        component: Gallery,
        name: 'Home Page',
        protected: true
    },
    {
        path: '/login',
        exact: true,
        component: Login,
        name: 'Login Page',
        protected: false
    },
    {
        path: '/profile',
        exact: true,
        component: UserProfile,
        name: 'User Profile',
        protected: true
    },
    {
        path: '/upload',
        exact: true,
        component: Upload,
        name: 'Upload Page',
        protected: true
    },
    {
        path: '/logout',
        exact: true,
        component: LogoutPage,
        name: 'Logout Page',
        protected: true
    },
    {
        path: '/posts/:id',
        exact: true,
        component: Post,
        name: 'Post',
        protected: true
    }
];

export default routes;