import React from "react"
import { Link } from '@mui/material';
import Banner from '../banner/Banner';
import Posts from '../home/Posts';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';

import { styled, Box, Typography } from '@mui/material';
import BannerImage from '/Users/sharvarisoparkar/Desktop/Blogpostwebsite/blog_post_website/src/HeplDesk.jpg';

const Image = styled(Box)`
    width: 100%;
    background: url(${BannerImage}) center/100% repeat-x #000;
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Heading = styled(Typography)`
    font-size: 90px;
    color: black;
    line-height: 1
`;

// const SubHeading = styled(Typography)`
//     font-size: 20px;
//     background: #FFFFFF;
// `;
function Help (){

      return (
        <>
        <Image>
            <Heading>Explore, Engage, Evolve</Heading>
        </Image>
         <div style={{ margin: '50px', marginTop: '0cm', fontFamily: 'Arial, sans-serif' }}>
  <h1 style={{alignContent:'center'}}>Welcome to the Help Center</h1>
  <h2>We're Here to Assist You</h2>
  <p>
    Hello and welcome to TheEveryThingChronicals's Help Center! Our goal is to make your experience on our blog as enjoyable and seamless as possible. Whether you're a new visitor or a seasoned reader, this Help Center is designed to provide you with the assistance you need.
  </p>

  <h2>Navigating the Blog</h2>
  <p>
    <strong>1. Finding Your Way Around:</strong><br />
    Homepage: The homepage is where you'll find our latest and most popular articles.<br />
    Categories: Explore specific topics by checking out our categorized sections.<br />
    Search Bar: Looking for something specific? Use our search bar to find articles and information.
  </p>

  <p>
    <strong>2. User Accounts:</strong><br />
    Registering: Consider creating a user account to personalize your experience.<br />
    Profile Settings: Manage your preferences and settings through your user profile.
  </p>

  <h2>Reading and Interacting</h2>
  <p>
    <strong>3. Reading Articles:</strong><br />
    Article Layout: Familiarize yourself with our article layout for easy reading.<br />
    Comments: Share your thoughts by leaving comments on articles.<br />
    Sharing: Enjoyed an article? Spread the word by sharing it on social media.
  </p>

  <p>
    <strong>4. Technical Support:</strong><br />
    Browser Compatibility: Ensure you are using a compatible browser for the best experience.<br />
    Troubleshooting: Encountering issues? Check our troubleshooting guide or contact our support team.
  </p>

  <h2>Get in Touch</h2>
  <p>
    <strong>5. Contact Us:</strong><br />
    Feedback: We value your feedback. Let us know what you love or areas where we can improve.<br />
    Support: For specific issues, reach out to our support team through our Contact Form or email us at <Link>support@yourblog.com</Link>
  </p>

  <h2>Frequently Asked Questions (FAQ)</h2>
  <p>
    <strong>6. Common Queries:</strong><br />
    Explore our FAQ: Many common questions are answered in our FAQ section.<br />
    Terms and Policies: Review our Terms of Service and Privacy Policy for more information.
  </p>

  <h2>Stay Connected</h2>
  <p>
    <strong>7. Follow Us:</strong><br />
    Social Media: Connect with us on Facebook, Twitter, and Instagram for updates and additional content.<br />
    Newsletter: Subscribe to our newsletter for exclusive content and updates.
  </p>

  <h2>Your Feedback Matters</h2>
  <p>
    We're committed to providing the best possible experience for our readers. If you have any suggestions, questions, or concerns, please don't hesitate to let us know. Your feedback is invaluable.
    <br /><br />
    Thank you for being a part of the TheEveryThingChronicals community!
    <br /><br />
    Happy Reading!
    <br /><br />
    TheEveryThingChronicals Team
  </p>
</div>

            <Fab color="primary" aria-label="add" style={{ position: "fixed", bottom: 25, right: 25, }}>
                <AddIcon />
            </Fab>
        </>
      );
    }

export default Help

