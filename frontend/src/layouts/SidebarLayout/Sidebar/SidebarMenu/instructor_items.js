import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const menuItems = [
  {
    heading: 'Home',
    items: [
      {
        name: 'Home',
        link: '/home',
        start_icon: HomeIcon
      },
      {
        name: 'Messages',
        start_icon: EmailIcon,
        link: '/home/messenger/c/ch'
      },
      // {
      //   name: 'Course Content',
      //   icon: FeaturedVideoIcon,
      //   link: '/home/course_content'
      // },
      // {
      //   name: 'Course Info',
      //   icon: FeedIcon,
      //   link: '/home/course_info'
      // },
      // {
      //   name: 'Create Course',
      //   icon: CreateNewFolderIcon,
      //   link: '/home/create_course'
      // },
      {
        name: 'Profile',
        start_icon: AccountCircleIcon,
        link: '/home/user',
      },
      // {
      //   name: 'Create Community',
      //   icon: AccountCircleIcon,
      //   link: '/home/create_community',
      // }
      
    ]
  },
];

export default menuItems;
