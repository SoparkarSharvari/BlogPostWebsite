import {React} from "react"
import { Grid,Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import {Container,Box,Typography,Link} from '@mui/material';
import Paper from '@mui/material/Paper';
import Banner from '../banner/Banner';
import Posts from '../home/Posts';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Divider from '@mui/material/Divider';
import { DataContext } from '../../context/DataProvider';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Password } from "@mui/icons-material";

const Title =styled(Typography)`
color: black; 
background-color: rgba(225, 232, 234, 0.374);
border-radius: 40px;
font-size: 20px;
z-index: 2; 
position: relative;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  position: relative; 
`;
const Tagline =styled(Typography)`
color: black; 
background-color: rgba(225, 232, 234, 0.374);
border-radius: 30px;
font-size: 20px;
z-index: 2; 
position: relative;
padding:5px;
`
const Discription =styled(Typography)`
color: black; 
background-color: rgba(225, 232, 234, 0.374);
border-radius: 40px;
font-size: 20px;
z-index: 2; 
height:max-content;
position: relative;
padding:10px;
overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4; /* Number of lines to show */
`
const Genre =styled(Typography)`
color: black; 
background-color: rgba(225, 232, 234, 0.374);
border-radius: 40px;
font-size: 20px;
z-index: 2; 
position: relative;
`
const StyledGrid = styled(Grid)(({ theme }) => ({
    flexGrow: 1,
    justifyContent: 'center', // Center content horizontally
    alignItems: 'center', // Center content vertically
    boxShadow: 'none ',  // Remove the box-shadow property
    border: 'none',    // Remove the border property
  }));
const StyledItem = styled(Box)`
  border-radius: 40px;
  padding: 30px;
  text-align: center;
  height: 400px;
  position: relative;
  overflow: hidden; /* Ensure that the overlay doesn't overflow */

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${(props) => props.backgroundImage});
    background-size: cover;
    border-radius: 40px;
    opacity: 1.0; /* Adjust the opacity for the background image */
    z-index: 1; /* Place the image below the content */
  }

  &:hover {
    &::before {
      opacity: 0.7; /* Adjust the opacity for the hover effect */
    }
  }
`;
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
const Preview = styled(Box)`
  height: 210px;
  width: 210px; /* Set width and height to the same value for a perfect circle */
  border: 2.9px solid rgba(129, 128, 126, 0.374);
  margin-top: 10px;
  margin-left:30%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%; /* Make it a circle */
  img: {
    borderRadius: '50%', // Apply border-radius to the image
    maxWidth: '100%', // Ensure the image does not exceed the container
    maxHeight: '100%', // Ensure the image does not exceed the container
  },
`;

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const GridStyle = styled(Grid)(({ theme }) => ({
    alignContent: 'center',
    margin: '0.5cm',
    padding: '30px',
    boxShadow: 'none !important',
    border: 'none !important', 
  }));
  
  const ItemStyle =styled(Item)`
    height:6cm;
    box-shadow: none !important;  // Remove box shadow
  border: none !important; 
  `
function Profile (){
  const [postsData, setPostsData] = useState(null);
  const [totalBlogs, setTotalBlogs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allImage, setAllImage] = useState(null);
  const [image, setImage] = useState(null);

    const { account } = useContext(DataContext);
    const navigate = useNavigate(); 
    
    useEffect(() => {
      console.log('Profile component mounted');
    }, []);

    useEffect(() => {
        getImage();
      }, []);

      const getImage = async () => {
        debugger
        const result = await axios.get("http://localhost:8000/get-image");
        console.log(result);
        setAllImage(result.data.data);
        
      };
      const [formData, setFormData] = useState({
        username:account.username,
        avatar:image
      });
      const history = useNavigate();
      const handleFormSubmit = async (e,title,tagline,discription,genre) => {
        e.preventDefault();
        debugger
        console.log(account.username)
        const formData = new FormData();
        formData.append("username", account.username);
        formData.append("avatar", image);
        
        try{
            await axios.put(`http://localhost:8000/updateProfile/${account.username}`,
                
                formData,
                {
                  headers: { "Content-Type": "multipart/form-data" },
                }
                
            )
            .then(res=>{
                if(res.data ==="exist"){
                    alert("Profile Updated");
                    history("/home")
                }
                else if (res.data === "notexist"){
                    alert("Updation error");
                    history("/explore")
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
 
useEffect(() => {
  const fetchPostsData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/postsBy/${account.username}`, { method: "GET" });
      const data = await response.json();
      console.log('Posts Data received:', data);
      setPostsData(data.data);
      
    } catch (error) {
      console.error('Error fetching posts data:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchPostsData();
}, [account.username]);

useEffect(() => {
  const fetchTotalBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/totalBlogs/${account.username}`, { method: "GET" });
      const data = await response.json();
      console.log('Total Blogs Data received:', data);
      setTotalBlogs(data.data);
    } catch (error) {
      console.error('Error fetching total blogs data:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchTotalBlogs();
}, [account.username]);
useEffect(() => {
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/get-image/${account.username}`);
      const data = await response.json();
      console.log('Data received:', data);
      setImage(data.avatar);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, [account.username]);


const handleFileChange = async (e) => {
  const file = e.target.files[0];
  setImage(file)
  console.log(file)
};

    const handleLinkClick = (post) => {
      console.log('Link clicked!');
      navigate(`/posts/${post._id}`); 
    };
      return (
        <>
        <GridStyle container spacing={3}>
            <GridStyle item xs={5.5}>
                <ItemStyle>
                     <Preview>
                                {image ? <img style={{height:'100%', width:'100%',borderRadius: '50%',}} src={URL.createObjectURL(image)} alt=''/> : <CloudUploadIcon/>}
                           </Preview>
                           <br></br>
                            <Button style={{backgroundColor:'black'}} component="label" variant="contained"  >
                            
                            {image ? 'Change profile' : 'Upload Profile'}
                                    <VisuallyHiddenInput
                                        type="file"
                                        onChange={handleFileChange}
                                    />
                            </Button>
                </ItemStyle>
            </GridStyle >
            <GridStyle  item xs={5.5}>
                <ItemStyle >
                    <h1>Welcome to The EveryThingChronicales</h1><br></br>
                    <Typography variant="h6" component="h2">
                     User Name : {account.username}
                     <br></br>
                     Total Blogs Published : {totalBlogs}
                    </Typography>
                    <br></br><br></br>
                    <Button style={{backgroundColor:'black',marginTop:'45px'}} variant="contained" onClick={(e) =>handleFormSubmit(e)}>
                    {'UPDATE MY PROFILE'}
                </Button>
                </ItemStyle>
            </GridStyle >
            </GridStyle >
             <Container style={{ alignItems: 'center', maxWidth: '100%' }} maxWidth="sm"><br />
          <StyledGrid  container spacing={3} sx={{ flexGrow: 1 }}>
              {postsData !== null ? (
                postsData.map((post) => (
                  <Grid item xs={3} key={post._id}> 
                    <StyledItem backgroundImage={require(`../../images/${post.image}`)}>
                    <StyledLink to={`/home`} onClick={() => handleLinkClick(post)}>
                      <Title>{post.title}</Title>
                    </StyledLink><br></br>
                      <Tagline>{post.tagline}</Tagline>
                      <br></br><br></br><br></br>
                      <Discription>{post.discription}</Discription>
                      <br></br>
                      <Genre>Genre:{post.genre}</Genre>
                    </StyledItem>
                  </Grid>
                ))
              ) : (
                <p>Loading...</p>
              )}
          </StyledGrid>
      </Container>
      <Fab color="primary" aria-label="add" style={{ position: "fixed", bottom: 105,right: 51,}}>
                 <AddIcon styles={{color:'grey'}}/>
                         </Fab>
        </>
      );
    }

export default Profile