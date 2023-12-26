import React from 'react'
import axios from "axios"
import { TextField, Box, Button, Typography, styled } from '@mui/material';
import { useState, useEffect,useContext } from 'react';
import { useNavigate} from "react-router-dom";
import { DataContext } from '../../context/DataProvider';
import '/Users/sharvarisoparkar/Desktop/Blogpostwebsite/blog_post_website/src/login.css'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { GoogleLogin } from 'react-google-login';

const clientId="341893567459-kqb1pa4kcd7sricmm9t1076kjocse3ek.apps.googleusercontent.com";

const Component = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;
const OuterBox =styled(Box)`
    justify-content: flex-start;
    border-radius: 30px; 
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
    margin-top :50px
    
`;
const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;
const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;
const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;
const Image = styled('img')({
  width: 100,
  display: 'flex',
  margin: 'auto',
  padding: '40px 0 0'
});
const Name = styled(Typography)`
  algin:center;
  font-size: 18px;
  font-weight: bold;
  margin-left:80px;
`;
const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

export const Login = (props) => {
  
  const imageURL = props.imageURL;
  const { setAccount } = useContext(DataContext);
  const name = 'TheEverythingChronicles'; 
  const history = useNavigate();

  const [account, toggleAccount] = useState('login');
  const [login, setLogin] = useState({username: '',password: ''});
  const [signup, setSignup] = useState({ name: '',username: '',password: ''});
  const [error, showError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    showError(false);
}, [login])

const toggleSignup = () => {
  account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
}
async function handleLogin(e,username,password) {
  setAccount ({username: login.username})
    e.preventDefault();
    try{
        await axios.post("http://localhost:8000/",{
            username,password
        })
        .then(res=>{
          debugger
            if(res.data ==="exist"){
                props.isUserAuthenticated(true)
                history("/home",{state:{id:username}})
            }
            else if(res.data==="notexist"){
                alert("User have not sign up")
            }
        })
        .catch(e=>{
            alert("wrong details")
        })
       
    }
    catch(e){
        console.log(e);
    }
};

async function handleSignup (e,name,username,password)  {
    e.preventDefault();

    try{

        await axios.post("http://localhost:8000/signup",{
            username,password
        })
        .then(res=>{
            if(res.data==="exist"){
                alert("User already exists")
            }
            else if(res.data==="notexist"){
                alert("Signup Complete");
            
            }
        })
        .catch(e=>{
            alert("wrong details")
            console.log(e);
        })

    }
    catch(e){
        console.log(e);

    }
};

const onValueChange = (form, field, value) => {
  if (form === 'login') {
    setLogin((prevLogin) => ({ ...prevLogin, [field]: value }));
  } else {
    setSignup((prevSignup) => ({ ...prevSignup, [field]: value }));
  }
};
const responseGoogle = (response) => {
  if (response?.profileObj) {
    // Assuming you have the user's Google profile information
    const { email, givenName, familyName } = response.profileObj;

    // Use this information to authenticate the user or perform any necessary actions
    // For example, you can send this information to your server to create or authenticate the user

    // After successful authentication, navigate to the home page
    history("/home", { state: { id: email, givenName, familyName } });
  } else {
    // Handle unsuccessful Google login
    console.error("Google login failed");
  }
};


  return (
    <div class="background-container">
    <div class="overlay"></div>
      <OuterBox style={{backgroundColor:'white'}}> 
        <Image src={imageURL} alt="logo" />
        <Name>{name}</Name>
        {
        account === 'login' ?
          <Component className='loginBox'>
              <TextField id="outlined-basic1"  onChange={(e) => onValueChange('login', 'username', e.target.value)}value={login.username} label="UserName" variant="outlined" />
              <TextField
        id="outlined-basic2"
        type={showPassword ? 'text' : 'password'}  // Toggle between text and password
        onChange={(e) => onValueChange('login', 'password', e.target.value)}
        value={login.password}
        label="Password"
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
              {error && <Error>{error}</Error>}
              <LoginButton variant="contained" onClick={(e) => handleLogin(e,login.username,login.password)}>Login</LoginButton>
              <Text style={{ textAlign: 'center' }}>OR</Text>
              <SignupButton onClick={() => toggleSignup()} style={{ marginBottom: 50 }}>Create an account</SignupButton>              
          </Component>
          :
          <Component className='signInBox'>
              <TextField id="outlined-basic1" label="Full Name"onChange={(e) => onValueChange('signup', 'name', e.target.value)}     value={signup.name} variant="outlined" />
              <TextField id="outlined-basic2" label="UserName" onChange={(e) => onValueChange('signup', 'username', e.target.value)} value={signup.username}variant="outlined" />
              <TextField id="outlined-basic3" type="password"label="Password" onChange={(e) => onValueChange('signup', 'password', e.target.value)} value={signup.password}variant="outlined" />
              <SignupButton onClick={(e) => handleSignup(e,signup.name,signup.username,signup.password)}>Signup</SignupButton>
              <Text style={{ textAlign: 'center' }}>OR</Text>
              <LoginButton variant="contained" onClick={() => toggleSignup()}>Already have an account</LoginButton>
          </Component>
          
        }     
           {/* <Component className='loginBox'>
     
      <GoogleLogin
        clientId={clientId}
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
     
    </Component> */}
      </OuterBox>
    
    </div>
  )
}
