import HomeIcon from '@mui/icons-material/Home';
import SendIcon from '@mui/icons-material/Send';
import FeaturedVideoIcon from '@mui/icons-material/FeaturedVideo';
import FeedIcon from '@mui/icons-material/Feed';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import CodeIcon from '@mui/icons-material/Code';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CodeOff from '@mui/icons-material/CodeOff';

const menuItems = [
  {
    heading: 'Home',
    items: [
      {
        name: 'Home',
        link: '/home',
        start_icon: HomeIcon,
        end_icon:"",
      },
      {
        name: 'Messenger',
        start_icon: SendIcon,
        end_icon:"",
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
      {
        name: 'Profile',
        start_icon: AccountCircleIcon,
        end_icon:"",
        link: '/home/user',
      },

    ]
  },
  {
    heading: 'Topics recommended for you',
    items: [
      {
        name: 'Python',
        start_icon: CodeIcon,
        end_icon: CodeOff,
        link: '/home/user',
      },
      {
        name: 'Java',
        start_icon: CodeIcon,
        end_icon: CodeOff,
        link: '/home/user',
      },
      {
        name: 'Mern stack',
        start_icon: CodeIcon,
        end_icon: CodeOff,
        link: '/home/user',
      },
      {
        name: 'Javascript',
        start_icon: CodeIcon,
        end_icon: CodeOff,
        link: '/home/user',
      }
    ]
  },
];

export default menuItems;
