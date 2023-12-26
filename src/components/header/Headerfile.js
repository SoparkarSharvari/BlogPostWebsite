
import { AppBar, Toolbar, styled} from '@mui/material'; 
import { Link } from 'react-router-dom';
import React from "react";
import Drawer from '@mui/material/Drawer';
import {Box, Button} from '@mui/material';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Face2Icon from '@mui/icons-material/Face2';
import DrawIcon from '@mui/icons-material/Draw';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import HomeIcon from '@mui/icons-material/Home';

const Component = styled(AppBar)`
    background: #FFFFFF;
    color: black;
`;

const Container = styled(Toolbar)`
justify-content: flex-start;
    & > a {
        padding: 20px;
        color: #000;
        text-decoration: none;
    }
    display:flex;
`

const Button1 = styled(Button)`
    text-transform: none;
    background: lightgray;
    color: gray;
    margin-top:10px;
    height: 48px;
    border-radius: 2px;
    margin-left: 10px;
    margin-bottom:10px;
`;
const Linkstyle =styled(Link)`
    color:black;
    text-decoration:none;
`
const Headerfile = () => {

    const [state, setState] = React.useState({left: false,});

      const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setState({ ...state, [anchor]: open });
      };
    
      const list = (anchor) => (
        <Box
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <List>
            {
        <List>
           <Linkstyle to='/Myprofile'>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon> <Face2Icon /> </ListItemIcon>
            <ListItemText primary='My Profile' />
          </ListItemButton>
        </ListItem>
       </Linkstyle>
          <Linkstyle to='/home'>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary='Home' />
          </ListItemButton>
        </ListItem>
        </Linkstyle> 
        <Linkstyle to='/create'>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon> <DrawIcon /> </ListItemIcon>
            <ListItemText primary='Create Blog' />
          </ListItemButton>
        </ListItem>
        </Linkstyle>
        <Linkstyle to='/LikedPosts'>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <FavoriteBorderIcon />
            </ListItemIcon>
            <ListItemText primary='Liked Blog' />
          </ListItemButton>
        </ListItem>
        </Linkstyle>
        <Linkstyle to='/SavedPosts'>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <BookmarkBorderIcon />
            </ListItemIcon>
            <ListItemText primary='Saved Blog' />
          </ListItemButton>
        </ListItem>
        </Linkstyle>
      </List>
      
            }
          </List>
          <Divider />
          <List>
            {
        <List>
        <Linkstyle to='/inspiration'>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon> <AutoGraphIcon/> </ListItemIcon>
            <ListItemText primary='Inspiration' />
          </ListItemButton>
        </ListItem>           
        </Linkstyle>
        <Linkstyle to='/help'>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon> <HelpOutlineIcon/> </ListItemIcon>
            <ListItemText primary='Help' />
          </ListItemButton>
        </ListItem>
        </Linkstyle>
        <Linkstyle to='/'>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
             <LogoutIcon/>
            </ListItemIcon>
            <ListItemText primary='Logout' />
          </ListItemButton>
        </ListItem>
        </Linkstyle>
      </List>
      
            }
          </List>
        </Box>
      );
    
    return (
        <Component>
            <Container>{['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                <Button1 onClick={toggleDrawer(anchor, true)}> <MenuIcon /> </Button1>
                <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                >
                    {list(anchor)}
                </Drawer>
                </React.Fragment>
            ))}
                <Link style={{'margin-left':'900px'}}to='/home'>HOME</Link>
                <Link to='/explore'>EXPLORE</Link>
                <Link to='/create'>CREATE</Link>
                <Link to='/'>LOGOUT</Link>
            </Container>
        </Component>
    )
}

export default Headerfile;