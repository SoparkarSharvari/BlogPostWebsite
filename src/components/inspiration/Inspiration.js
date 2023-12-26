import React , { useState, useEffect } from "react"
import { Link } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import {Container,Box,Typography} from '@mui/material';
import Paper from '@mui/material/Paper';
import img1 from './character-3.svg';
import img2 from './character-2.svg';
import img3 from './character-10.svg';
import img4 from './character-4.svg';
import B2img1 from './B2img1.jpg';
import B2img2 from './B2img2.jpg';
import B2img3 from './B2img3.jpg';
import B2img4 from './B2img4.jpg';
import image1 from './1.jpg'
import image2 from './2.jpg'
import image3 from './3.jpg'
import image4 from './4.jpg'


import { List } from "@mui/icons-material";

const VideoStyle = styled("video")`
  width: 100%;
  height: 100%;
`;

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
  border-radius: 0px;
  padding: 0px;
  text-align: center;
  height: 300px;
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
    padding: '20px',
  }));
  
  const ItemStyle =styled(Item)`
    height:8cm;
    img {
      max-width: 100%;
   }

  //   box-shadow: none !important;  // Remove box shadow
  // border: none !important; 
  `
function Inspiration (){
  const [currentImage, setCurrentImage] = useState(0);
  const images = [img1, img2, img3, img4]; // Add your image sources here
  const images1 = [B2img1,B2img2,B2img3,B2img4];
  const images2 =[image1,image2,image3,image4];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [images.length]);


  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images1.length);
    }, 3000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [images1.length]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images2.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [images2.length]);

      return (
        <>
        <GridStyle container spacing={0}>
            <GridStyle  item xs={7}>
                <ItemStyle >
                    <h1>TRENDING TODAY</h1>
                    <Typography variant="h2" component="h2" style={{overflow:' hidden',textDecorationColor:'black'}}>
                      📸 Social media
                      🎨 Painting  
                      🎤 Up comming Concerts 
                      Food 🍔 !! 
                   </Typography>
                </ItemStyle>
            </GridStyle >
            <GridStyle item xs={4}>
                <ItemStyle>
                <img src={images[currentImage]} alt="" />
                </ItemStyle>
            </GridStyle >
            <GridStyle item xs={5.5}>
            <StyledItem backgroundImage={images2[currentImage]}> </StyledItem>
            </GridStyle >
            <GridStyle  item xs={5.5}>
                <ItemStyle >
                    <h1>GET POETIC</h1><br></br>
                    <Typography variant="h6" component="h2">
                    "The Raven" by Edgar Allan Poe<br></br>
                    "The Road Not Taken" by Robert Frost<br></br>
                    "I Wandered Lonely as a Cloud" by William Wordsworth<br></br>
                    "The Love Song of J. Alfred Prufrock" by T.S. Eliot<br></br>
                    "Ode to a Nightingale" by John Keats<br></br>
                    "The Waste Land" by T.S. Eliot
                     </Typography>
                </ItemStyle>
            </GridStyle >
            <GridStyle  item xs={3.5}>
                <ItemStyle >
                    <h1>TOPICS TO KEEP U INSPIRIED</h1><br></br>
                    <Typography variant="h6" component="h2">
                    <a href="https://www.google.com/search?client=firefox-b-d&q=Start-up+Stories" rel="noreferrer" target="_blank">Start-up Stories</a><br></br>
                    <a href="https://www.google.com/search?client=firefox-b-d&q=Start-up+Stories" rel="noreferrer" target="_blank">Technological Advancements</a><br></br>
                    <a href="https://www.google.com/search?client=firefox-b-d&q=Start-up+Stories" rel="noreferrer" target="_blank">Travel Experiences</a><br></br>
                    {/* <a href="https://www.google.com/search?client=firefox-b-d&q=Start-up+Stories" rel="noreferrer" target="_blank">Building Meaningful Connections</a><br></br> */}
                    <a href="https://in.pinterest.com/search/pins/?q=art%20forms&rs=typed" rel="noreferrer" target="_blank">Thinking Outside the Box</a><br></br>
                    <a href="https://www.google.com/search?client=firefox-b-d&q=Start-up+Stories" rel="noreferrer" target="_blank">Exploring Different Art Forms</a><br></br>
                     </Typography>
                </ItemStyle>
                
            </GridStyle >
            <GridStyle item xs={3}>
                <ItemStyle>
                <img src={images1[currentImage]} alt="" style={{height:'300px'}} />
                </ItemStyle>
            </GridStyle >
            <GridStyle  item xs={3.5}>
                <ItemStyle >
                    <h1>WHAT GENZS R READING</h1><br></br>
                    <Typography variant="h6" component="h2">
                    Fantasy and Sci-Fi<br></br>
                    Young Adult Fiction<br></br>
                    Dystopian Fiction<br></br>
                    Graphic Novels and Manga<br></br>
                    Diverse Voices and Social Issues<br></br>
                     </Typography>
                </ItemStyle>
            </GridStyle >
            <GridStyle  item xs={11.5}>
                <ItemStyle >
                    <h1>ALL THATS ON YOUR MIND</h1><br></br>
                   
                    <Typography variant="h4" component="h2">
                    Start now. Start where you are. Start with fear. Start with pain. Start with doubt. Start with hands shaking. Start with voice trembling but start. Start and don’t stop. Start where you are, with what you have. Just… start.
                     </Typography> 
                </ItemStyle>
            </GridStyle >
            </GridStyle >
            <Fab color="primary" aria-label="add" style={{ position: "fixed", bottom: 105,right: 51,}}>
                 <AddIcon styles={{color:'grey'}}/>
            </Fab>
        </>
      );
    }

export default Inspiration

