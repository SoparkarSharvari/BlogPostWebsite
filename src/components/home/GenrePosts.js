import React , { useState, useEffect , useContext } from "react"
import { experimentalStyled as styled } from '@mui/material/styles';
import { Box,Container,Typography} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Link} from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';

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
  z-index: 2; 
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
padding:10px;
background-color: rgba(225, 232, 234, 0.374);
border-radius: 40px;
font-size: 20px;
z-index: 2; 
height:max-content;
position: relative;
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

const UserNameStyle = styled(Typography)`
 font-size:20px;
 margin-left:20px;
`
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function GenrePost(props){
    const [data, setPostData] = useState(null);
    const genre = props.genre;
    const { account } = useContext(DataContext);
    const navigate = useNavigate(); 

    useEffect(() => {
        debugger
        if(genre === 'Food Blog'){
            fetch(`http://localhost:8000/Food%20Blog`, {method:"GET"}) 
            .then(response => response.json())
            .then((data)=>{
            setPostData(data.data)
          })
          .catch(error => console.error('Error fetching data:', error)); }
        else if (genre ==='Tech Blog'){
            fetch(`http://localhost:8000/Tech%20Blog`, {method:"GET"}) 
            .then(response => response.json())
            .then((data)=>{
            setPostData(data.data)
          })
          .catch(error => console.error('Error fetching data:', error)); 
        }
        else if (genre ==='Motivational Blog'){
            fetch(`http://localhost:8000/Motivational%20Blog`, {method:"GET"}) 
            .then(response => response.json())
            .then((data)=>{
            setPostData(data.data)
          })
          .catch(error => console.error('Error fetching data:', error)); 
        }
        else if (genre ==='Fashion Blog'){
            fetch(`http://localhost:8000/Fashion%20Blog`, {method:"GET"}) 
            .then(response => response.json())
            .then((data)=>{
            setPostData(data.data)
          })
          .catch(error => console.error('Error fetching data:', error)); 
        }
        else if (genre ==='Movie Blog'){
            fetch(`http://localhost:8000/Movie%20Blog`, {method:"GET"}) 
            .then(response => response.json())
            .then((data)=>{
            setPostData(data.data)
          })
          .catch(error => console.error('Error fetching data:', error)); 
        }
        else if (genre ==='Gaming Blog'){
            fetch(`http://localhost:8000/Games%20Blog`, {method:"GET"}) 
            .then(response => response.json())
            .then((data)=>{
            setPostData(data.data)
          })
          .catch(error => console.error('Error fetching data:', error)); 
        }
        else if (genre ==='Book Blog'){
            fetch(`http://localhost:8000/Books%20Blog`, {method:"GET"}) 
            .then(response => response.json())
            .then((data)=>{
            setPostData(data.data)
          })
          .catch(error => console.error('Error fetching data:', error)); 
        }
        else{
            fetch(`http://localhost:8000/allpost`, {method:"GET"}) 
            .then(response => response.json())
            .then((data)=>{
            setPostData(data.data)
          })
          .catch(error => console.error('Error fetching data:', error)); 
        }
        
      });
      const handleLikeToggle = async (postId) => {
        debugger
        console.log("like button cliked")
        const response2 = await fetch(`http://localhost:8000/like/${postId}/${account.username}`, { method: "POST" });
        const data2 = await response2.json();
        console.log('Data received:', data2);
        const response = await fetch(`http://localhost:8000/allposts`, { method: "GET" });
            const data = await response.json();
            console.log('Data received:', data);
            setPostData(data.data);
  
      };
    
      const handleSaveToggle = async (postId) => {
        debugger
        console.log("saved button cliked")
        const response3 = await fetch(`http://localhost:8000/save/${postId}/${account.username}`, { method: "POST" });
        const data3 = await response3.json();
        console.log('Data received:', data3);
        const response = await fetch(`http://localhost:8000/allposts`, { method: "GET" });
            const data = await response.json();
            console.log('Data received:', data);
            setPostData(data.data);
  
      };
    return(
      <Container style={{ alignItems: 'center', maxWidth: '100%' }} maxWidth="sm">
        <br />
          <StyledGrid container spacing={3} sx={{ flexGrow: 1 }}>
              {data !== null ? (
                data.map((post) => (
                  <Grid item xs={3} key={post._id}>
                   <StyledItem backgroundImage={require(`../../images/${post.image}`)}>
                    <StyledLink to={`/posts/${post._id}`}>
                      <Title>{post.title}</Title>
                    </StyledLink><br></br>
                      <Tagline>{post.tagline}</Tagline>
                      <br></br><br></br><br></br>
                      <Discription>{post.discription}</Discription>
                      <br></br>
                      <Genre>Genre:{post.genre}</Genre>
                    </StyledItem>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <UserNameStyle>{post.username}</UserNameStyle>
                    <div style={{ display: 'flex', alignItems: 'center' , marginRight:'20px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />}
                        checked={post.likes.includes(account.username)} 
                        onChange={() => handleLikeToggle(post._id)}  // Use a property to determine if the post is liked
                      />
                        <Typography variant="subtitle2">{post.likes.length}</Typography>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Checkbox {...label} icon={<BookmarkBorderIcon />} checkedIcon={<BookmarkIcon />} 
                        checked={post.saved.includes(account.username)} 
                        onChange={() => handleSaveToggle(post._id)}/>
                        <Typography variant="subtitle2">
                          {post.saved.includes(account.username) ? "Saved" : "Unsaved"}
                        </Typography>
                        </div>
                      </div>
                    </div>
                  </Grid>
                ))
              ) : (
                <p>Loading...</p>
              )}
          </StyledGrid>
      </Container>
    );
}
export default GenrePost;