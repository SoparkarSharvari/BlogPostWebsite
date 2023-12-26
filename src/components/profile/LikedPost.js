import {React} from "react"
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import {Container,Box,Typography,Link} from '@mui/material';
import Paper from '@mui/material/Paper';
import { DataContext } from '../../context/DataProvider';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import BannerImage from '/Users/sharvarisoparkar/Desktop/Blogpostwebsite/blog_post_website/src/likedpost.jpg';
import './profile.css'

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
  const Image = styled(Box)`
  width: 100%;
  background: url(${BannerImage}) center/100% repeat-x ;
  height: 120vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Heading = styled(Typography)`
  font-size: 90px;
  color: white;
  line-height: 1;
  align: center;
  background-color: rgba(32, 30, 29, 0.493);
  font-family: 'lr';
  src: url('/public/Lobster/Lobster-Regular.ttf');
`;
const SubHeading = styled(Typography)`
  font-size: 20px;
  background: #FFFFFF;
`;
const LikedPost = ()=>{
    const [postsData, setPostsData] = useState(null);
    const [totalBlogs, setTotalBlogs] = useState(null);
    const [loading, setLoading] = useState(false);
      const { account } = useContext(DataContext);
      const navigate = useNavigate(); 
      
      useEffect(() => {
        console.log('Profile component mounted');
      }, []);
      
  useEffect(() => {
    const fetchPostsData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8000/LikedpostsBy/${account.username}`, { method: "GET" });
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

      const handleLinkClick = (post) => {
        console.log('Link clicked!');
        navigate(`/posts/${post._id}`); 
      };
    return (
        <>
        <Image>
            <Heading>Liked Blogs</Heading>
            <SubHeading></SubHeading>
           
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
      </Image>
      </>
    )
}
export default LikedPost;
