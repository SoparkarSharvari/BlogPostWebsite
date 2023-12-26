
import { styled, Box, Typography } from '@mui/material';
import BannerImage from '/Users/sharvarisoparkar/Desktop/Blogpostwebsite/blog_post_website/src/hero-divider-1500w.png';

const Image = styled(Box)`
    width: 100%;
    background: url(${BannerImage}) center/100% repeat-x ;
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Heading = styled(Typography)`
    font-size: 90px;
    color: white;
    line-height: 1;
    align:center;
    background-color:rgba(32, 30, 29, 0.493);
`;

const SubHeading = styled(Typography)`
    font-size: 20px;
    background: #FFFFFF;
`;

const Banner = () => {
    
    return (
        <Image>
            <Heading>Explore, Engage, Evolve</Heading>
            <SubHeading></SubHeading>
        </Image>
    )
}

export default Banner;