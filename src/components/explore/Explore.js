import React from "react"
import { experimentalStyled as styled } from '@mui/material/styles';
import { Box} from '@mui/material';
import Grid from '@mui/material/Grid';
import item1Image from './Motivation.jpg';
import item2Image from './FoodBlog.jpg';
import item3Image from './MovieBlog.jpg'
import item4Image from './TechBlog.jpg';
import item6Image from './GameBlog.jpg';
import item5Image from './FashionBlog.jpg';
import item7Image from './BookBlog.jpg';
import { categories } from '/Users/sharvarisoparkar/Desktop/Blogpostwebsite/blog_post_website/src/components/constants/data.js';
import { Link} from 'react-router-dom';


const StyledGrid = styled(Grid)`
  margin: auto;
  display: flex;
  justify-content: center;
  alignItems: center;
`;

const StyledItem = styled(Box)`
  border-radius: 40px;
  padding: 20px;
  text-align: center;
  height: 450px;
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

const Title = styled('div')`
  color: black; 
  background-color: rgba(225, 232, 234, 0.374);
  border-radius: 40px;
  font-size: 45px;
  z-index: 2; 
  position: relative;
`;

const Paragraph = styled('div')`
  color: black;
  background-color: rgba(225, 232, 234, 0.374);
  font-size: 22px;
  z-index: 2; 
  position: relative;
  margin-top:277px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  z-index: 2; 
  position: relative; 
`;

let imagess=[item1Image,item2Image,item3Image,item4Image,item5Image,item6Image,item7Image]

function Explore(){
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    return (
        <Box sx={{ flexGrow: 1 ,'marginTop':'90px', 'marginLeft':'30px', 'marginRight':'30px','display': 'flex','flexDirection': 'column','justifyContent': 'center','alignItems': 'center'}}>
              <h2>{currentDate}</h2>
              <h1>STAY INSPIRED</h1>
            <StyledGrid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {categories.map((category, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <StyledItem  key={category.id} backgroundImage={imagess[index]}>
              <StyledLink to={`/${category.type}`}>
                <Title>{category.title}</Title>
              <br></br>
                 <Paragraph>{category.paragraph}</Paragraph> 
              <br></br>
              </StyledLink>
        </StyledItem>
          </Grid>
        ))}
      </StyledGrid>
      </Box>
      );
    }

export default Explore

