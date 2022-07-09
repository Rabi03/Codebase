import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import CourseInfo from './content/applications/CourseInfo';
import CreateCourse from './content/applications/CreateCourse';
import CreateCommunity from './content/applications/CreateCommunity';
import Login from './content/auth/Login';
import Register from './content/auth/Register';
import Community from './content/applications/Community';

const Loader = (Component) => (props) => (
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);
// Protected Route
const ProtectRoute = Loader(lazy(() => import('src/ProtectRoute')));


// Pages

const Overview = Loader(lazy(() => import('src/content/overview')));

// Dashboards

const Promotions = Loader(lazy(() => import('src/content/dashboards/Home')));

// Applications

const Messenger = Loader(lazy(() => import('src/content/applications/Messenger')));
const Course_Content = Loader(lazy(() => import('src/content/applications/courseContent')));
const UserProfile = Loader(lazy(() => import('src/content/applications/Users/profile')));

const routes = [
  {
    path: '*',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Overview />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'overview',
        element: (
          <Navigate
            to="/"
            replace
          />
        )
      },
    ]
  },
  
  {
    path: 'home',
    element: (
      <SidebarLayout />
    ),
    children: [
      {
        path: '/',
        element: <ProtectRoute Element={Promotions} />
      },
      {
        path: 'messenger',
        element: <ProtectRoute Element={Messenger} />
      },
      {
        path: 'course_content',
        element: <ProtectRoute Element={Course_Content} />
      },
      {
        path: 'course/:course_id',
        element: <ProtectRoute Element={CourseInfo} />
      },
      {
        path: ':community_id/create_course',
        element: <ProtectRoute Element={CreateCourse} />
      },
      {
        path: 'create_community',
        element: <ProtectRoute Element={CreateCommunity} />
      },
      {
        path: 'user',
        element: <ProtectRoute Element={UserProfile} />
      },
      {
        path: 'community/:community_id',
        element: <ProtectRoute Element={Community} />
      },
      
    ]
  },
];

export default routes;
