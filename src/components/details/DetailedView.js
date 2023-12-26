import React from "react"
import { Box,Typography} from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';
import bg from './DetailedViewPage.jpg'
import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom'
import { Delete, Edit } from '@mui/icons-material';
import { DataContext } from '../../context/DataProvider';
import axios from 'axios';
import Comments from "./comments/Comments";
import { useNavigate } from 'react-router-dom';

const EditIcon = styled(Edit)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;


const Image = styled(Box)`
    width: 100%;
    background: url(${bg}) center/50% repeat-x #000;
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const Heading = styled(Typography)`
    background-color: black;
    width:max-content;
    border-radius: 0px;
    padding:10px;
    color:white;
    font-size: 38px;
    font-weight: 600;
`;
const InnerBox =styled(Box)`
    margin:20px;
`;

const Discription = styled(Typography)`
    border: 1.9px solid rgba(129, 128, 126, 0.374);
    display:flex;
    border-radius: 0px;
    font-size: 20px;
    font-weight: 600;
    width:100%
`;
const DetailedView =()=>{
    const [post, setPost] = useState({});
    const { id } = useParams();
    const { account } = useContext(DataContext);
    const navigate = useNavigate();
    useEffect(()=>{
        fetch(`http://localhost:8000/DetailedView/${id}`, {method:"GET"})  
       
        .then(response => response.json())
        .then((data)=>{
          setPost(data.data)
        })
        .catch(error => console.error('Error fetching data:', error));
   
    },[id])

    const deleteBlog = async () => {  
        
        try {
            const response = await axios.delete(`http://localhost:8000/delete/${id}`);
          
            // Check the status code to determine if the deletion was successful
            if (response.status === 200) {

              console.log('Deletion successful');
              window.alert('Post deleted successfully');
              navigate('/home'); 
              // Handle any additional logic or UI updates after successful deletion
            } else {
              console.error('Deletion failed');
              // Handle the case where the server did not return a success status code
            }
          } catch (error) {
            console.error('An error occurred during deletion', error);
            // Handle the error, e.g., show an error message to the user
          }
        
    }

    return (
        <>
        <Image></Image>
        <Box style={{ float: 'right' }}>
                {   account.username === 'soparkar' && 
                    <>  
                        <Link to={`/update/${post._id}`}><EditIcon color="primary" /></Link>
                        <DeleteIcon onClick={() => deleteBlog()} color="error" />
                    </>
                }
            </Box>
            <br></br>
            <InnerBox>
            <Heading>{post.title}</Heading>
            <br></br>
            <Discription>{post.discription}</Discription>
            </InnerBox>
            <Comments post={post}/>
            
        </>
    );
}
export default DetailedView