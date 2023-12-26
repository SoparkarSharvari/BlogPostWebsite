import { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, styled } from '@mui/material';
import { DataContext } from '../../../context/DataProvider';
import axios from "axios"
import Comment from './Comment';

const Container = styled(Box)`
    margin-top: 100px;
    display: flex;
`;

const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%'
});
const StyledTextArea = styled(TextareaAutosize)`
    height: 100px !important;
    width: 100%; 
    margin: 0 20px;
`;

const initialValue = {
    name: '',
    postId: '',
    date: new Date(),
    comments: ''
}



const Comments = ({ post }) => {
    const url = 'https://static.thenounproject.com/png/12017-200.png'
    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        const getData = async () => {
            debugger
            try {
                console.log('Fetching data...');
                const response = await fetch(`http://localhost:8000/getcomments/${post._id}`, { method: "GET" });
                const data = await response.json();
                console.log('Data received:', data);
                setComments(data.data);
              } catch (error) {
                console.error('Error fetching data:', error);
              }
            };
        getData();
    }, [toggle, post]);

    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comments: e.target.value
        });
    }

    const addComment = async(e) => {
        e.preventDefault();
        try{
            await axios.post("http://localhost:8000/addcomment",
              comment
            )
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
        debugger
        console.log(comments)
        setComment(initialValue)
        console.log(comments)
        setToggle(prev => !prev);
    }
    
    const { account } = useContext(DataContext);
    return (
        <Box>
            <Container>
                <Image src={url} alt="dp" />   
                <StyledTextArea 
                    rowsMin={5} 
                    placeholder="what's on your mind?"
                    onChange={(e) => handleChange(e)} 
                    value={comment.comments}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    size="medium" 
                    style={{ height: 40 }}
                    onClick={(e) => addComment(e)}
                >Post</Button>             
            </Container>
            <Box>
                {
                    comments && comments.length > 0 && comments.map(comment => (
                        <Comment comment={comment} setToggle={setToggle} />
                    ))
                }
            </Box>
        </Box>
    )
}

export default Comments;